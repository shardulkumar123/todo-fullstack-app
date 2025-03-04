import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.cookies?.token;
        if (!token) {
            res.status(401).json({ message: "Token is missing" });
        }
        jwt.verify(token, process.env.SECRET_KEY as string, (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({ message: "Invalid or expired token" });
            }
            console.log("Token verified:", decoded);
            next();
        });
    } catch (error) {
        console.log('error', error)
    }

}