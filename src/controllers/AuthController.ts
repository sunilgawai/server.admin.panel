import { Request, Response, NextFunction } from "express";
import { AuthValidator } from "../validators";
import { database } from "../services/database";
import { CustomErrorHandler, JwtService } from "../services";
import bcrypt from "bcrypt";
import { REFRESH_TOKEN_SECRET } from "../../config";

class AuthController {
    static async register(req: Request, res: Response, next: NextFunction): Promise<any> {
        // Request Validation.
        const { error } = AuthValidator.register_request(req.body);
        if (error) {
            return next(error);
        }
        const { first_name, last_name, phone, email, password } = req.body;

        try {
            const user = await database.user.findUnique({
                where: {
                    email: email,
                    phone: phone
                }
            })

            if (user) {
                return next(CustomErrorHandler.alreadyExists("User with this credentials already exists."));
            }
        } catch (error) {
            return next(error);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        let user;
        try {
            user = await database.user.create({
                data: {
                    first_name: first_name,
                    last_name: last_name,
                    phone: phone,
                    email: email,
                    password: hashedPassword
                },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    phone: true,
                    email: true,
                    role: true
                }
            })
        } catch (error) {
            return next(error);
        }

        let access_token, refresh_token;
        try {
            access_token = JwtService.sign({ id: user.id, role: user.role });
            refresh_token = JwtService.sign({ id: user.id, role: user.role }, '1y', REFRESH_TOKEN_SECRET);
            await database.refreshToken.create({
                data: {
                    token: refresh_token
                }
            })
        } catch (error) {
            return next(error);
        }

        res.status(200).json({
            user: user,
            access_token: access_token,
            refresh_token
        });
    }

    static async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        // Validating request.
        const { error } = AuthValidator.login_request(req.body);
        if (error) {
            return next(error);
        }
        const { email, phone, password } = req.body;

        let user, access_token, refresh_token;
        try {
            user = await database.user.findUnique({
                where: {
                    email: email,
                    phone: phone
                }
            })
            if (!user) {
                return next(CustomErrorHandler.notFound("User not found."));
            }
            // Checking password.
            const matched = bcrypt.compare(password, user.password);
            if (!matched) {
                return next(CustomErrorHandler.wrongCredentials("Wrong password."));
            }
        } catch (error) {
            return next(error);
        }

        try {
            access_token = JwtService.sign({ id: user.id, role: user.role });
            refresh_token = JwtService.sign({ id: user.id, role: user.role }, '1y', REFRESH_TOKEN_SECRET);
            await database.refreshToken.create({
                data: {
                    token: refresh_token
                }
            })
        } catch (error) {
            return next(error);
        }
        res.status(200).json({
            message: "Login successfully",
            user: user,
            access_token: access_token,
            refresh_token
        });
    }

    static async me(req: Request, res: Response, next: NextFunction): Promise<any> {
        // getting logged in user from request.headers;
        const authUser = req.user;
        let user;
        try {
            user = await database.user.findUnique({
                where: {
                    id: authUser.id,
                },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    phone: true,
                    email: true,
                    role: true
                }
            })
            if (!user) {
                return next(CustomErrorHandler.notFound("User not found."));
            }
        } catch (error) {
            return next(error);
        }

        res.status(200).json({ user })
    }

    static async logout(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            await database.refreshToken.delete({
                where: {
                    token: req.body.refreshToken
                }
            })
                .then(token => {
                    res.status(200).json({ message: "Logged out successfully." })
                })
                .catch(err => next(err));
        } catch (error) {
            return next(error);
        }
    }

    static async refresh(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { error } = AuthValidator.refresh_request(req.body);
        if (!error) {
            return next(error);
        }

        let token;
        try {
            token = await database.refreshToken.findUnique({
                where: {
                    token: req.body.refresh_token
                }
            })
            if (!token) {
                return next(CustomErrorHandler.unAuthorized("Already Logged out."));
            }
        } catch (error) {
            return next(error);
        }

        let userId;
        try {
            const { id } = <{ id: string, role: string }>JwtService.verify(token.token, REFRESH_TOKEN_SECRET);
            userId = id;
        } catch (error) {
            return next(CustomErrorHandler.unAuthorized("Invalid RefreshToken."))
        }

        let user;
        try {
            user = await database.user.findUnique({
                where: {
                    id: userId
                }
            })
            if (!user) {
                return next(CustomErrorHandler.notFound("User not found."));
            }
        } catch (error) {
            return next(error);
        }

        let access_token, refresh_token;
        try {
            access_token = JwtService.sign({ id: user.id, role: user.role });
            refresh_token = JwtService.sign({ id: user.id, role: user.role }, '1y', REFRESH_TOKEN_SECRET);
            await database.refreshToken.create({
                data: {
                    token: refresh_token
                }
            })
        } catch (error) {
            return next(error);
        }

        res.status(200).json({
            message: "Refresh  successfully",
            user: user,
            access_token: access_token,
            refresh_token
        });
    }
}

export default AuthController;