import Joi from "joi";

class CartValidator {
    static register_request = (req_body: object) => Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        department: Joi.string().required(),
        country: Joi.number().required(),
        state: Joi.number().required(),
        city: Joi.number().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().max(10).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        repeat_password: Joi.ref('password'),
    }).validate(req_body);

    static login_request = (req_body: object) => Joi.object({
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        password: Joi.string().required(),
    }).validate(req_body);

    static refresh_request = (req_body: object) => Joi.object({
        refresh_token: Joi.string().required(),
    }).validate(req_body);
}

export default CartValidator;