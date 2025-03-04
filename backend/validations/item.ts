import Joi from 'joi'

export const itemSchemaValidation = Joi.object({
    user_id: Joi.number().integer().required().messages({
        "number.base": "User ID must be a number",
        "number.integer": "User ID must be an integer",
        "any.required": "User ID is required",
    }),
    title: Joi.string().min(3).max(255).required().messages({
        "string.base": "Title must be a string",
        "string.min": "Title must be at least 3 characters long",
        "string.max": "Title must be less than 255 characters",
        "any.required": "Title is required",
    }),
    description: Joi.string().min(5).max(500).required().messages({
        "string.base": "Description must be a string",
        "string.min": "Description must be at least 5 characters long",
        "string.max": "Description must be less than 500 characters",
        "any.required": "Description is required",
    }),
});


export const idSchemaValidation = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        "number.base": "ID must be a number",
        "number.integer": "ID must be an integer",
        "number.positive": "ID must be a positive number",
        "any.required": "ID is required",
    }),
});

export const updateItemSchemaValidation = Joi.object({
    title: Joi.string().min(3).max(255).optional().messages({
        "string.base": "Title must be a string",
        "string.min": "Title must be at least 3 characters long",
        "string.max": "Title must be less than 255 characters",
    }),
    description: Joi.string().min(5).max(500).optional().messages({
        "string.base": "Description must be a string",
        "string.min": "Description must be at least 5 characters long",
        "string.max": "Description must be less than 500 characters",
    }),
});

