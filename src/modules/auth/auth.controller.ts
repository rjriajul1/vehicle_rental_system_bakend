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



const signin = async (req:Request, res:Response) => {
    try{
        const {email, password} = req.body;
        console.log(req.body);

        const result = await  AuthServices.signin(email,password);
        res.status(201).json({
            success: true,
            message: "Login successful",
            data: {
                token: "empty",
                user: {
                    result
                }
            }
        })

    }catch(err: any) {
           res.status(500).json({
            success: false,
            message: err.message
           })
    }

}

// const signin = async (req: Request, res: Response) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email and Password are required",
//             });
//         }

//         const result = await AuthServices.signin(email, password);

//         return res.status(200).json({
//             success: true,
//             message: "Login successful",
//             data: result
//         });

//     } catch (error: any) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };


export const authController = {
    signUpUser,
    signin
}