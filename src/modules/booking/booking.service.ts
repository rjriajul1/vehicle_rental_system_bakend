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

const getCustomerBookings = async (customerId: number) => {
  const query = `
    SELECT b.*, 
      json_build_object('name', u.name, 'email', u.email) AS customer,
      json_build_object('vehicle_name', v.vehicle_name, 'registration_number', v.registration_number) AS vehicle
    FROM bookings b
    JOIN users u ON b.customer_id = u.id
    JOIN vehicles v ON b.vehicle_id = v.id
    WHERE b.customer_id = $1
    ORDER BY b.id ASC
  `;
  const result = await pool.query(query, [customerId]);
  return result.rows;
};


 const updateBookingStatus = async (bookingId: number, status: string) => {

  const query = `
    UPDATE bookings
    SET status = $1
    WHERE id = $2
    RETURNING *;
  `;
  const result = await pool.query(query, [status, bookingId]);
  const booking = result.rows[0];

  // If returned, update vehicle availability
  if (status === "returned") {
    await pool.query(
      `UPDATE vehicles SET availability_status = 'available' WHERE id = $1`,
      [booking.vehicle_id]
    );
    // add vehicle info in response
    booking.vehicle = { availability_status: "available" };
  }

  return booking;
};


const updateCustomerBooking = async (
  bookingId: number,
  customerId: number,
  status: string
) => {

  const checkQuery = `SELECT * FROM bookings WHERE id = $1 AND customer_id = $2`;
  const checkResult = await pool.query(checkQuery, [bookingId, customerId]);

  if (checkResult.rowCount === 0) {
    throw new Error("Booking not found or not owned by customer");
  }


  const updateQuery = `
    UPDATE bookings
    SET status = $1
    WHERE id = $2
    RETURNING *;
  `;
  const result = await pool.query(updateQuery, [status, bookingId]);
  return result.rows[0];
};



export const bookingService = {
  createBooking,
  getAllBookings,
  getCustomerBookings,
  updateBookingStatus,
  updateCustomerBooking
};
