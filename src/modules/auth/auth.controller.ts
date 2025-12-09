import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

const signUpUser = async (req:Request, res:Response) => {
    const {id, name, email, phone, role}  = req.body

    try{

        const result = await AuthServices.signUpUser(req.body)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                 id: id,
                 name: name,
                 email: email,
                 phone: phone,
                 role: role,
            }
        })

    }catch(err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }

}


export const authController = {
    signUpUser
}