import express, { Request, Response } from "express";
const app = express()

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