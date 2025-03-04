import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        let token = req.cookies?.token;

        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            }
        }

        if (!token) {
            res.status(401).json({ message: "Token is missing" });
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET as string, (err: jwt.VerifyErrors | null, decoded: any) => {
            if (err) {
                res.status(401).json({ message: "Invalid or expired token" });
                return;
            }

            (req as any).user = decoded;
            next();
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
