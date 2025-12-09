import { Router } from "express";
import { vehicleController } from "./vehicles.controller";

const router= Router()

router.post('/vehicles', vehicleController.createVehicle)
router.get('/vehicles', vehicleController.getAllVehicles)

export const vehicleRouter = router;