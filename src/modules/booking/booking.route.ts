import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router()

router.post('/bookings', bookingController.createBooking)


export const bookingRouter = router;