import { Express } from "express-serve-static-core";

interface IRequestUser {
    id: string
    role: string
}

declare module "express-serve-static-core" {
    interface Request {
        user: IRequestUser
    }
}