import { Request, Response, NextFunction } from "express";
import { CustomerValidator } from "../validators";
import { database } from "../services/database";

class CustomerController {
    static async store(req: Request, res: Response, next: NextFunction) {
        // Validating the request.
        console.log("body", req.body);
        const { error } = CustomerValidator.store_request(req.body);
        if (error) {
            return next(error);
        }

        const { first_name, last_name, phone, email, country, state, city, shop, kyc } = req.body;

        try {
            await database.customer.create({
                data: {
                    first_name,
                    last_name,
                    email,
                    phone,
                    countryId: country,
                    stateId: state,
                    cityId: city,
                    kycId: kyc,
                    submitted_by_userId: req.user.id
                },
                include: {
                    address: true,
                    Shop: true,
                    kyc: true
                }
            }).then((results) => {
                res.status(200).json(results)
            }).catch((err) => {
                return next(err);
            })
        } catch (error) {
            return next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            await database.customer.findMany({
                include: {
                    Shop: true,
                    kyc: true,
                    address: true,
                    submitted_by: true
                }
            }).then((result) => {
                res.status(200).json(result);
            }).catch((error) => {
                return next(error);
            })
        } catch (error) {
            return next(error);
        }
    }

    static async view(req: Request, res: Response, next: NextFunction) {
        if (!req.params.id) {
            return next(new Error('Invalid params'));
        }
        try {
            await database.customer.findUnique({
                where: {
                    id: req.params.id
                }
            }).then((customer) => {
                res.status(200).json(customer);
            }).catch((err) => {
                return next(err);
            })
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        // updating customers.
        const { error } = CustomerValidator.store_request(req.body);

        if(error) {
            return next(error);
        }

        try {
            await database.customer.update({
                where: {
                    id: req.params.id
                },
                data: {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    phone: req.body.phone,
                    email: req.body.email,
                    countryId: req.body.country,
                    stateId: req.body.state,
                    cityId: req.body.city,
                    kyc: req.body.kyc,
                    address: req.body.address
                },
                include: {
                    Shop: true,
                    kyc: true
                }
            }).then((customer) => {
                res.status(200).send(customer);
            }).catch((err) => {
                return next(err);
            })
        } catch (error) {
            return next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        if (!req.params.id) {
            return next(new Error('Invalid params.'));
        }
        try {
            await database.customer.delete({
                where: {
                    id: req.params.id
                }
            }).then((customer) => {
                res.status(200).json(customer);
            }).catch((err) => {
                return next(err);
            })
        } catch (error) {
            return next(error);
        }
    }
}

export default CustomerController;