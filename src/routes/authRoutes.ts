import { Router } from "express";
import { AuthController } from "../controllers";
import { auth } from "../middlewares";

const authRouter = Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);
authRouter.post('/logout', AuthController.logout);
authRouter.get('/me', auth, AuthController.me);
authRouter.post('/refresh', AuthController.refresh);

export default authRouter;