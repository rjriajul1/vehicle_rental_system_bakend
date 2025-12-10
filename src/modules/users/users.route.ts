import { Router } from "express";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";

const router = Router()

router.get('/users',auth("admin"), userController.getAllUsers );
router.delete('/users/:userId',auth('admin'), userController.deleteUser)
router.put('/users/:userId',auth("admin"), userController.updateUser)

export const userRouter = router;