import express, { Request, Response } from "express";
import initDB from "./config/db";
const app = express()

// body parser for json data 
app.use(express.json())


initDB()

// root route
app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})


// not found route 
app.use((req:Request, res:Response) => {
  res.status(400).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});


export default app;