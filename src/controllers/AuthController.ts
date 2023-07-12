import { Request, Response, NextFunction } from "express";

class AuthController {
    static async register(req: Request, res: Response, next: NextFunction): Promise<any> {

        res.json({ message: "register successfully" })
    }

    static async login(req: Request, res: Response, next: NextFunction): Promise<any> {

        res.json({ message: "login successfully" })
    }

    static async logout(req: Request, res: Response, next: NextFunction): Promise<any> {

        res.json({ message: "logout successfully" })
    }

    static async refresh(req: Request, res: Response, next: NextFunction): Promise<any> {

        res.json({ message: "refresh successfully" })
    }
}

export default AuthController;