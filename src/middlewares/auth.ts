import { NextFunction, Request, RequestHandler, Response } from "express";

const auth: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("headers", req.headers);



        
    } catch (error) {
        next();
        return next(error);
    }
}

export default auth;