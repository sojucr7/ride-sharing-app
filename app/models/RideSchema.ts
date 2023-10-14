import Joi from "joi";

export const createSchema = Joi.object({
    sourceCoordinates: Joi.array().ordered(Joi.number().min(-90).max(90).required(),Joi.number().min(-180).max(180).required()),
    destinationCoordinates: Joi.array().ordered(Joi.number().min(-90).max(90).required(),Joi.number().min(-180).max(180).required()),
    pathCoordinates: Joi.array().items(Joi.array().ordered(Joi.number().min(-90).max(90).required(),Joi.number().min(-180).max(180).required())),
})
