import { Request, Response, NextFunction } from "express";

class CustomerController {
    static async store(req: Request, res: Response, next: NextFunction) {
        
        res.status(200).json({ customer: "Customer stored" });
    }
}

export default CustomerController;