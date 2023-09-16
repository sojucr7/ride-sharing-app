import Joi from "joi";

export const schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string()
        .required()
        .email(),
    name: Joi.string()
        .required().max(25)
})

export const updateSchema = Joi.object({
    password: Joi.string().optional(),
    email: Joi.string()
        .optional()
        .email(),
    name: Joi.string()
        .optional().max(25)
})