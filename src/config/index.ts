import dotenv from 'dotenv'

import path from 'path'

dotenv.config({path: path.join(process.cwd(), ".env")})

const config = {
    port: process.env.PORT,
    connection_str: process.env.DB_CONNECTION_STR,
    jwt_secret_str:process.env.JWT_SECRET
}


export default config