import { UtilityController } from "../controllers";
import { Router } from "express";

const utilityRouter = Router();

utilityRouter.get('/location/countries', UtilityController.getCountries);
utilityRouter.get('/location/states', UtilityController.getStates);
utilityRouter.get('/location/cities', UtilityController.getCities);


utilityRouter.get('/departments', UtilityController.getDepartments);

export default utilityRouter;