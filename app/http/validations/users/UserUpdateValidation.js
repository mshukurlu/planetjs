const Joi = require("joi");
const User = require("../../../models/user")

const userUpdateValidation =  Joi.object({
    id:Joi.number(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().external(async (value, helpers) => {
      const existUser = await User.checkEmailAndIdForUpdateValidation(this.id,value)

      if(existUser){
      return  helpers.message('Email bazada mövcuddur!')
      }else{
        return value
      }

    }, 'custom validation'),
    password: Joi.string().required(),
    confirmedPassword:Joi.string().valid(Joi.ref('password')).required().
    messages({'any.onlly':'Password doesnot match'})
});


module.exports = userUpdateValidation;