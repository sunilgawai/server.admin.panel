import Joi from "joi";

class CustomerValidator {
    static store_request = (req_body: object) => Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().max(10).required(),
        country: Joi.number().required(),
        state: Joi.number().required(),
        city: Joi.number().required(),
        shop: Joi.string().required(),
        kyc: Joi.string().required(),
        address: Joi.string()
    }).validate(req_body);

    static update_request = (req_body: object) => Joi.object({
        first_name: Joi.string(),
        last_name: Joi.string(),
        email: Joi.string().email(),
        phone: Joi.string(),
        country: Joi.number(),
        state: Joi.number(),
        city: Joi.number(),
        shop: Joi.string(),
        kyc: Joi.string(),
        address: Joi.string()
    }).validate(req_body);
}

export default CustomerValidator;