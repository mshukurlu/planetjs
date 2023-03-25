const Joi = require("joi");

const UserLoginValidation = Joi.object({
    'email':Joi.required(),
    "password":Joi.required()
})

module.exports = UserLoginValidation;