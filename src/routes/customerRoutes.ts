import { Router } from "express";
import { CustomerController } from "../controllers";
import { auth } from "../middlewares";

const customerRouter = Router();

customerRouter.post('/customer', auth, CustomerController.store);

customerRouter.get('/customer', auth, CustomerController.get);

customerRouter.get('/customer/:id', auth, CustomerController.view);

customerRouter.delete('/customer/:id', auth, CustomerController.delete);



export default customerRouter;