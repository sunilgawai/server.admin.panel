import { Request, Response, NextFunction } from "express";
import { CustomerValidator } from "../validators";
import { database } from "../services/database";
import { CustomErrorHandler } from "../services";

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
            const customer = await database.customer.findFirst({
                where: {
                    OR: [
                        { phone: phone },
                        { email: email }
                    ]
                }
            });
            if (customer) {
                return next(CustomErrorHandler.alreadyExists("Customer with this credentials already exists."))
            }
        } catch (error) {
            console.log("error", error);
            return next(error);
        }
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
                    submitted_by: true,
                    Country: true,
                    State: true,
                    City: true
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
                },
                include: {
                    Country: true,
                    State: true,
                    City: true,
                    Shop: true,
                    kyc: true,
                    address: true,
                    submitted_by: true
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
        const { error } = CustomerValidator.update_request(req.body);
        console.log({ 'req': req.body, id: req.params.id });
        if (error) {
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
                    Country: { connect: { id: req.body.country } },
                    State: { connect: { id: req.body.state } },
                    City: { connect: { id: req.body.city } },
                    kyc: { connect: { id: req.body.kyc } },
                    address: req.body.address,
                },
                include: {
                    Shop: true,
                    kyc: true
                }
            }).then((customer) => {
                res.status(200).send(customer);
            }).catch((err) => {
                console.log(err);
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
                console.log(err);
                return next(err);
            })
        } catch (error) {
            return next(error);
        }
    }
}

export default CustomerController;