import { Router } from "express";
import { vehicleController } from "./vehicles.controller";

const router= Router()

router.post('/vehicles', vehicleController.createVehicle)
router.get('/vehicles', vehicleController.getAllVehicles)
router.get('/vehicles/:vehicleId', vehicleController.getSingleVehicle)

export const vehicleRouter = router;