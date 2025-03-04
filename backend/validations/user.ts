import Joi from 'joi'

export const userSchemaValidation = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        "string.base": "Name must be a string",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must be less than 50 characters",
        "any.required": "Name is required",
    }),
    email: Joi.string().email().required().messages({
        "string.base": "Email must be a string",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
    }),
    password: Joi.string().min(6).max(100).required().messages({
        "string.base": "Password must be a string",
        "string.min": "Password must be at least 6 characters long",
        "string.max": "Password must be less than 100 characters",
        "any.required": "Password is required",
    }),
});


export const loginSchemaValidation = Joi.object({
    email: Joi.string().email().required().messages({
        "string.base": "Email must be a string",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
    }),
    password: Joi.string().min(6).max(100).required().messages({
        "string.base": "Password must be a string",
        "string.min": "Password must be at least 6 characters long",
        "string.max": "Password must be less than 100 characters",
        "any.required": "Password is required",
    }),
});
