import { Request, Response } from "express";
import { vehicleService } from "./vehicles.service"


const create_vehicle = async (req:Request, res:Response) => {
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


export const vehicleController = {
    create_vehicle
}