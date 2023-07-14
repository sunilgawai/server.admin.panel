import { Router } from "express";
import { CustomerController } from "../controllers";
import { auth } from "../middlewares";

const customerRouter = Router();

customerRouter.post('/customer', auth, CustomerController.store);



export default customerRouter;