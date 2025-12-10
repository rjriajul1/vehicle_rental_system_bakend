import { pool } from "../../config/db"

const getAllUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`)

    return result
};

const deleteUser = async (id: string)=> {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    return result;
};


const updateUser = async (id: string, payload: any) => {

  
  if (!payload || Object.keys(payload).length === 0) {
    return null;
  }

  const fields = Object.keys(payload);     
  const values = Object.values(payload);    

  const setQuery = fields
    .map((field, index) => `${field}=$${index + 1}`)
    .join(", ");

  
  const query = `
      UPDATE users
      SET ${setQuery}
      WHERE id=$${fields.length + 1}
      RETURNING id, name, email, phone, role, created_at
  `;


  const result = await pool.query(query, [...values, id]);

  
  if (result.rows.length === 0) return null;

  return result.rows[0];
};


export const userService = {
    getAllUsers,
    deleteUser,
    updateUser
}