import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import config from "../config";

export const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authToken = req.headers.authorization;
      // console.log(authToken);

      if (!authToken) {
        return res.status(401).json({
          success: "Failed!!",
          message: "You are not allowed!!",
        });
      }

      const decoded = verify(
        authToken,
        config.jwt_secret as string
      ) as JwtPayload;
      console.log("decoded", decoded);

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message:
            "Forbidden! You can't access all user's data. Only admin can access all data.",
        });
      }
      console.log("req set call");
      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};
