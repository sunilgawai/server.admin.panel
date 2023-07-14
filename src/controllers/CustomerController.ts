import { Request, Response, NextFunction } from "express";
import { CustomerValidator } from "../validators";
import { database } from "../services/database";

class CustomerController {
    static async store(req: Request, res: Response, next: NextFunction) {
        // Validating the request.
        const { error } = CustomerValidator.store_request(req.body);
        if (error) {
            return next(error);
        }

        const { name, phone, email, country, state, city, shop, kyc } = req.body;
        
        try {
            // const customer = await database.customer.create({
            //     data: {
            //         name: name,
            //         phone: phone,
            //         email:email,
                    
            //     }
            // })
        } catch (error) {
            return next(error);
        }

        res.status(200).json({ customer: "Customer stored" });
    }
}

export default CustomerController;