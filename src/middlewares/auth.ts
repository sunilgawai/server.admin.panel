import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomErrorHandler, JwtService } from "../services";

const auth: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(CustomErrorHandler.unAuthorized());
    }

    const token = authHeader.split(' ')[1];
    // console.log(token);

    try {
        const { id, role } = <{ id: string, role: string }>JwtService.verify(token);
        req.user = {
            id: id,
            role: role
        };
        console.log("user", req.user);

        next(); // passing verification.
    } catch (error) {
        return next(CustomErrorHandler.unAuthorized());
    }
}

export default auth;