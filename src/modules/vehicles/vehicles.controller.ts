import { Request, Response } from "express";
import { vehicleService } from "./vehicles.service"


const createVehicle = async (req:Request, res:Response) => {
    const {id,vehicle_name,type, registration_number, daily_rent_price, availability_status} = req.body
    try {

        const result = await vehicleService.createVehicle(req.body);

        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: {
                 id: id,
                 vehicle_name: vehicle_name,
                 registration_number: registration_number,
                 daily_rent_price: daily_rent_price,
                 availability_status: availability_status
            }
        })

    }catch(err: any) {
      res.status(500).json({
          success: false,
          message: err.message
    })
    }
}

const getAllVehicles = async (req:Request, res: Response) => {

    try{
  const result = await vehicleService.getAllVehicles()
  if(result.rows.length === 0){
    res.status(404).json({
        success: true,
        message: "No vehicles found"
    })
  }

  res.status(200).json({
    success: true,
    message: "Vehicles retrieved successfully",
    data: result.rows
  })
    }catch(err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}


export const vehicleController = {
    createVehicle,
    getAllVehicles
}