
import { pool } from "../../config/db"
import bcrypt from "bcrypt"

const signUpUser = async(payload: Record<string, unknown>) => {
    const {name, email, password:planPassword, phone, role} = payload;

    const password = await bcrypt.hash(planPassword as string ,10)

    const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1,$2,$3,$4,$5) RETURNING *`, [name,email,password,phone,role]);

    return result;
}

export const AuthServices= {
    signUpUser
}