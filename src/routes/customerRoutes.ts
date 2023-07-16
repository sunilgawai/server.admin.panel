import { Router } from "express";
import { CustomerController } from "../controllers";
import { auth } from "../middlewares";

const customerRouter = Router();

customerRouter.post('/customer', auth, CustomerController.store);

customerRouter.get('/customer', auth, CustomerController.get);



export default customerRouter;