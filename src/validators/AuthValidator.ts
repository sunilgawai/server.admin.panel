import Joi from "joi";


class CartValidator {
    static register_request = (req_body: object) => Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        password: Joi.string().required(),
        repeat_password: Joi.ref('password'),
    }).validate(req_body);
}

export default CartValidator;