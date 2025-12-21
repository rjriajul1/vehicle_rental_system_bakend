
import { pool } from "../../config/db"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import { CLIENT_RENEG_LIMIT } from "tls";

const signUpUser = async (payload: Record<string, unknown>) => {
    const { name, email, password: planPassword, phone, role } = payload;

    const password = await bcrypt.hash(planPassword as string, 10)

    const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1,$2,$3,$4,$5) RETURNING *`, [name, email, password, phone, role]);

    return result;
};


const signin = async (email: string, password: string) => {

    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])

    if (result.rows.length === 0) {
        return null
    }

    const user = result.rows[0]


    const match = bcrypt.compare(password, user.password);

    if (!match) {
        return false
    }

    const token = jwt.sign({ name: user.name, email: user.email, role: user.role }, config.jwt_secret_str as string, { expiresIn: "7d" });
   
    return { token, user }

}

export const AuthServices = {
    signUpUser,
    signin
}