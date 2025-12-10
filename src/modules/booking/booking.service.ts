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

export const bookingService = {
  createBooking,
};
