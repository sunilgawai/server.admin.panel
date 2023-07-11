import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomErrorHandler, JwtService } from "../services";
import { IJwtPayload } from "../typings";

const auth: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Cookie", req.cookies);
        const { jwt_token } = req.cookies;
        if (!jwt_token) {
            return next(CustomErrorHandler.unAuthorized());
        }
        const { salesman_id, username } = <IJwtPayload>JwtService.verify(jwt_token);
        if (!salesman_id || !username) {
            return next(CustomErrorHandler.unAuthorized());
        }

        req.salesman = {
            salesman_id: salesman_id,
            username: username
        }
        console.log("req salesman", req.salesman)

        next();
    } catch (error) {
        return next(error);
    }
}

export default auth;