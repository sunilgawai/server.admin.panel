import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomErrorHandler } from "../services";
import { ValidationError } from "joi";

interface IData {
    message: string
    originalError?: string
}

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let data: IData = {
        message: "Internal Server Error",
        originalError: err.message 
        // ...(DEBUG_MODE === 'true' && { originalError: err.message })
    }
    // Check Joi Error Instance.
    if (err instanceof ValidationError) {
        statusCode = 422;
        data = {
            message: err.message
        }
    }

    // Check Customer error Instance.
    if(err instanceof CustomErrorHandler) {
        statusCode = err.status
        data = {
            message: err.message
        }
    }

    return res.status(statusCode).json(data);
}


export default errorHandler;