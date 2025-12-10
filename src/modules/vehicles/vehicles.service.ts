import { pool } from "../../config/db";


const createVehicle = async(payload: Record<string, unknown>)=> {

    const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = payload;

    const result = await pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1,$2,$3,$4,$5) `, [vehicle_name,type, registration_number, daily_rent_price, availability_status]);

    return result


}


const getAllVehicles = async () => {
    const result = await pool.query(`SELECT * FROM vehicles`)

    return result
}

const getSingleVehicle = async (id: string) => {

    const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
    return result;
    
};

const updateVehicle = async (id: string, payload: any) => {

  // Build dynamic query based on sent fields
  const fields = Object.keys(payload);
  const values = Object.values(payload);


  if (fields.length === 0) return null;

  const setQuery = fields.map((field, index) => `${field}=$${index + 1}`).join(", ");


  const query = `
      UPDATE vehicles
      SET ${setQuery}
      WHERE id=$${fields.length + 1}
      RETURNING id, vehicle_name, type, registration_number,daily_rent_price,availability_status
  `;

  const result = await pool.query(query, [...values, id]);

  if (result.rows.length === 0) return null;

  return result.rows[0];
};



export const vehicleService = {
    createVehicle,
    getAllVehicles,
    getSingleVehicle,
    updateVehicle
}