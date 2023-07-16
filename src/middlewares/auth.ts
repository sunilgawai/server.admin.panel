import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomErrorHandler, JwtService } from "../services";

const auth: RequestHandler = async (req: Request, _: Response, next: NextFunction) => {
    const {
        access_token,
        // refresh_token
    } = req.cookies;
    
    if (!access_token) {
        return next(CustomErrorHandler.unAuthorized());
    }

    try {
        const { id, role } = <{ id: string, role: string }>JwtService.verify(access_token);
        req.user = {
            id: id,
            role: role
        };

        next();
    } catch (error) {
        return next(CustomErrorHandler.unAuthorized());
    }
}

export default auth;