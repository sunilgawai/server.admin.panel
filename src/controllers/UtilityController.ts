import { Request, Response, NextFunction } from "express";
import { database } from "../services/database";


class UtilityController {
    // Needs to complete the following method.
    static async getLocation(req: Request, res: Response, next: NextFunction) {
        const { country, state, city } = req.query as { country: string, state: string, city: string };
        const cId = parseInt(country);
        const countryId = parseInt(state);
        const stateId = parseInt(city);

        try {
            if (countryId) {
                await database.states.findMany({
                    where: {
                        country_id: countryId
                    },
                    select: {
                        name: true,
                        id: true
                    }
                }).then(states => {
                    res.json(states);
                }).catch(err => {
                    return next(err);
                })
            }
        } catch (error) {
            return next(error);
        }
        if(req.query.state) {
            try {
                
            } catch (error) {
                
            }
        }
        try {
            if (stateId) {
                await database.cities.findMany({
                    where: {
                        state_id: stateId
                    },
                    select: {
                        name: true,
                        id: true
                    }
                }).then(cities => {
                    res.json(cities);
                }).catch(err => {
                    return next(err);
                })
            }
        } catch (error) {
            return next(error);
        }
        res.send([]);
    }

    static async getCountries(req: Request, res: Response, next: NextFunction) {
        try {
            await database.countries.findMany({
                select: {
                    name: true,
                    id: true
                }
            }).then(counties => {
                res.json(counties);
            }).catch(err => {
                return next(err);
            })
        } catch (error) {
            return next(error);
        }
    }

    static async getState(req: Request, res: Response, next: NextFunction) {
        const { country } = req.query as { country: string };
        console.log(country);
        const countryId = parseInt(country);
        try {
            await database.states.findMany({
                where: {
                    country_id: countryId
                },
                select: {
                    name: true,
                    id: true
                }
            }).then(states => {
                res.json(states);
            }).catch(err => {
                return next(err);
            })
        } catch (error) {
            return next(error);
        }
    }

    static async getCity(req: Request, res: Response, next: NextFunction) {
        const { state } = req.query as { state: string };
        console.log(state);
        const stateId = parseInt(state);
        try {
            await database.cities.findMany({
                where: {
                    state_id: stateId
                },
                select: {
                    name: true,
                    id: true
                }
            }).then(cities => {
                res.json(cities);
            }).catch(err => {
                return next(err);
            })
        } catch (error) {
            return next(error);
        }
    }

    static async getDepartments(req: Request, res: Response, next: NextFunction) {
        try {
            await database.department.findMany()
                .then(departments => {
                    res.json(departments);
                }).catch(err => {
                    return next(err);
                })
        } catch (error) {
            return next(error);
        }
    }
}

export default UtilityController;