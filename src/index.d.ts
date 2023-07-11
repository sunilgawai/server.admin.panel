
import * as express from "express";


declare global {
    namespace Express {
        interface Request {
            salesman?: {
                username: string;
                salesman_id: string;
            } = null;
        }
    }
}