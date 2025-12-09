import { Router } from "express";
import { vehicleController } from "./vehicles.controller";

const router= Router()

router.post('/vehicles', vehicleController.create_vehicle)

export const vehicleRouter = router;