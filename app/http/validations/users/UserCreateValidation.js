const Joi = require("joi");
const User = require("../../../models/user");

const userCreateValidation =  Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().external(async (value, helpers) => {
      const existUser = await User.getByEmail(value)

      if(existUser){
      return  helpers.message('Email bazada mövcuddur!')
      }else{
        return value
      }

    }, 'custom validation'),
    password: Joi.string().required()
});


module.exports = userCreateValidation;