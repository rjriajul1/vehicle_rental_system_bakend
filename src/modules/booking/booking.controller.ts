import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {

  try {
    const result = await bookingService.createBooking(req.body);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const getAllBookings = async (req: Request, res: Response) => {
  try {
    const user = req.user; 

    let result;

    if (user?.role === "admin") {
  
      result = await bookingService.getAllBookings();
    } else {
   
      result = await bookingService.getCustomerBookings(user?.id);
    }

    return res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



export const updateBooking = async (req: Request, res: Response) => {
  try {
    const user = req.user; // set by auth middleware
    const bookingId = parseInt(req.params.bookingId as string);
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    // Role-based update
    let updatedBooking;

    if (user?.role === "admin") {
      // Admin can mark booking as returned
      if (status !== "returned") {
        return res.status(403).json({
          success: false,
          message: "Admin can only mark booking as returned",
        });
      }
      updatedBooking = await bookingService.updateBookingStatus(bookingId, status);
    } else if (user?.role === "customer") {
      // Customer can cancel only their own booking
      if (status !== "cancelled") {
        return res.status(403).json({
          success: false,
          message: "Customer can only cancel their booking",
        });
      }
      updatedBooking = await bookingService.updateCustomerBooking(bookingId, user.id, status);
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized role",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        status === "cancelled"
          ? "Booking cancelled successfully"
          : "Booking marked as returned. Vehicle is now available",
      data: updatedBooking,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};






export const bookingController = {
  createBooking,
  getAllBookings
};
