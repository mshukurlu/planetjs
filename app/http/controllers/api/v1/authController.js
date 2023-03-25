const jwtAuth = require('../../../middlewares/auth/jwtAuth');
const UserService = require('../../../../services/user');
const UserLoginValidation = require('../../../validations/users/UserLoginValidation');

module.exports.login = async function(req,res) {

    const {email,password} = req.body;

    const validation = UserLoginValidation.validate(req.body);

    if(validation.error){
        return res.json(validation.error.details)
    }else{

    const result = await UserService.login(email,password);

    return res.status(result.status).json(result)

    }

}

module.exports.register = async function(req,res){

}
