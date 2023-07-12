import { Router } from "express";
import { CustomerController } from "../controllers";

const customerRouter = Router();

customerRouter.post('/customers', CustomerController.store);



export default customerRouter;