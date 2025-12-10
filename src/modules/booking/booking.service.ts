import { pool } from "../../config/db";


const createBooking = async (payload: any) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  //  Get vehicle info
  const vehicleQuery = await pool.query(
    `SELECT vehicle_name, daily_rent_price 
     FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );


  if (vehicleQuery.rows.length === 0) {
    throw new Error("Vehicle not found");
  };


  const vehicle = vehicleQuery.rows[0];

  // Calculate rental days
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);

  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));



  if (days <= 0) {
    throw new Error("Invalid rental date range");
  }

  //  Calculate total price
  const total_price = days * Number(vehicle.daily_rent_price);



  //  Save booking
  const bookingQuery = await pool.query(
    `INSERT INTO bookings 
      (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price,status) 
     VALUES ($1, $2, $3, $4, $5,$6)
     RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      "active"
    ]
  );

  const booking = bookingQuery.rows[0];

  return {
    ...booking,
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price
    }
  };
};



const getAllBookings = async () => {
  const query = `
    SELECT 
      b.id,
      b.customer_id,
      b.vehicle_id,
      b.rent_start_date,
      b.rent_end_date,
      b.total_price,
      b.status,
      json_build_object(
        'name', u.name,
        'email', u.email
      ) AS customer,
      json_build_object(
        'vehicle_name', v.vehicle_name,
        'registration_number', v.registration_number
      ) AS vehicle
    FROM bookings b
    JOIN users u ON b.customer_id = u.id
    JOIN vehicles v ON b.vehicle_id = v.id
    ORDER BY b.id ASC
  `;

  const result = await pool.query(query);
  return result.rows;
};







export const bookingService = {
  createBooking,
  getAllBookings
};
