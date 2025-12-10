import { Router } from "express";
import { userController } from "./users.controller";

const router = Router()

router.get('/users', userController.getAllUsers );
router.delete('/users/:userId', userController.deleteUser)
router.put('/users/:userId', userController.updateUser)

export const userRouter = router;