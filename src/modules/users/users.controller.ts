import { Request, Response } from "express"
import { userService } from "./users.service"


const getAllUsers = async (req:Request, res: Response) => {

    try{
  const result = await userService.getAllUsers()
  if(result.rows.length === 0){
    res.status(404).json({
        success: true,
        message: "Not found user",
        data: result.rows
    })
  }

  res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: result.rows
  })
    }catch(err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

};


const deleteUser = async (req:Request, res:Response) => {
    try{
        const{userId} = req.params;

    const result = await userService.deleteUser(userId as string)

    if(result.rowCount === 0){
        res.status(404).json({
            success: false,
            message: "User not found"
        })
    }else{
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    }
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const {userId} = req.params
    const loggedInUser:any = req.user;

    if (loggedInUser.role !== "admin" && loggedInUser.id !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this profile.",
      });
    }


    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update."
      });
    }

    const result = await userService.updateUser(userId as string, req.body);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};


export const userController = {
    getAllUsers,
    deleteUser,
    updateUser
}