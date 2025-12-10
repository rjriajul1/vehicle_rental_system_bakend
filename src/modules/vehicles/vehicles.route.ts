import { Router } from "express";
import { vehicleController } from "./vehicles.controller";
import auth from "../../middleware/auth";

const router= Router()

router.post('/vehicles',auth("admin"), vehicleController.createVehicle)
router.get('/vehicles', vehicleController.getAllVehicles)
router.get('/vehicles/:vehicleId', vehicleController.getSingleVehicle)
router.put('/vehicles/:vehicleId',auth("admin"), vehicleController.updateVehicle)
router.delete('/vehicles/:vehicleId',auth("admin"), vehicleController.deleteVehicle)

export const vehicleRouter = router;