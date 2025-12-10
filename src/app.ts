import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { vehicleRouter } from "./modules/vehicles/vehicles.route";
import { userRouter } from "./modules/users/users.route";
const app = express()

// body parser for json data 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// initializing db
initDB()

// root route
app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

// login and signup
app.use('/api/v1/auth', authRoutes);

// vehicle route 

app.use('/api/v1', vehicleRouter)

// user route

app.use('/api/v1', userRouter)

// not found route 
app.use((req:Request, res:Response) => {
  res.status(400).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});


export default app;