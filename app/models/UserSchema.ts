import Joi from "joi";

export const createSchema = Joi.object({
    password: Joi.alternatives(Joi.string(), Joi.number()).required(),
    email: Joi.string()
        .required()
        .email(),
    name: Joi.string()
        .required().max(25)
})

export const updateSchema = Joi.object({
    password: Joi.alternatives(Joi.string(), Joi.number()).optional(),
    email: Joi.string()
        .optional()
        .email(),
    name: Joi.string()
        .optional().max(25)
})