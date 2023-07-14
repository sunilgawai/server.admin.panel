import { UtilityController } from "../controllers";
import { Router } from "express";

const utilityRouter = Router();

utilityRouter.get('/location/countries', UtilityController.getCountries);

utilityRouter.get('/departments', UtilityController.getDepartments);

export default utilityRouter;