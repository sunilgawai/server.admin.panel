import Joi from "joi";
import { ICartItem } from "../typings";

class CartValidator {
    static post_cart = (req_body: object) => Joi.object({
        table: Joi.object({
            id: Joi.number().required(),
            cart_table_id: Joi.number().required(),
            cart_table_name: Joi.string().required(),
            Cart: Joi.object({
                id: Joi.number(),
                cart_table_id: Joi.number(),
                customer_first_name: Joi.string().allow(null,''),
                customer_last_name: Joi.string().allow(null,''),
                customer_mobile: Joi.string().allow(null,''),
                payment_status: Joi.string().allow(null, ''),
                payment_method: Joi.string().allow(null, ''),
                Cart_items: Joi.array<ICartItem>().required(),
                total_price: Joi.number().required(),
            })
        })
    }).validate(req_body);
}

export default CartValidator;