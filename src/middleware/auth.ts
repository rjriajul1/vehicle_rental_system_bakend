import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          message: "Authorization header missing",
        });
      }

      if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          message: "Invalid token format",
        });
      }

      const token = authHeader.split(" ")[1];

 
      const decoded = jwt.verify(
        token as string,
        config.jwt_secret_str as string
      ) as JwtPayload;

  
      req.user = decoded;

    
      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(403).json({
          message: "Unauthorized access",
        });
      }

      next();
    } catch (err: any) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};

export default auth