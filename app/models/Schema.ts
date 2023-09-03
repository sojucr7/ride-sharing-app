import Joi from "joi";

const schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string()
        .required()
        .email(),
    name: Joi.string()
        .required().max(25)
})
export default schema;
