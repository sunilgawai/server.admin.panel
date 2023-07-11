import { ICart } from "../typings";
import Joi from "joi";

class OrderValidator {
    static post_order = (req_body: object) => Joi.object({
        shop_code: Joi.string().required(),
        customer_first_name: Joi.string().required(),
        customer_last_name: Joi.string().required(),
        customer_mobile: Joi.string().required(),
        order_price: Joi.string(),
        payment_method: Joi.string().required(),
        payment_status: Joi.string().min(0),
        order_items: Joi.array().required()
    }).validate(req_body);
}

export default OrderValidator;