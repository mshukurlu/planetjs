const { response } = require("express");
const { func } = require("joi");
const UserService = require("../../../../services/user");
const userCreateValidation = require("../../../validations/users/UserCreateValidation");
const userUpdateValidation = require("../../../validations/users/UserUpdateValidation");



module.exports.index = async function(req,res){
    const allUsers = await UserService.getAllUsers();

    res.json({"data":allUsers})
}

module.exports.store  = async function(req,res){
     await userCreateValidation.validateAsync(req.body,{abortEarly:false}).then( async response2=>{
        const data = {firstName,lastName,password,email} = req.body;
        const response = await UserService.createUser(data);
        return res.status(201).json(response);
     }).catch(error=>{
      return   res.status(400).send(error.details);
    });
}

module.exports.update = async function(req,res){
    const {id} = req.params.id;
   const body = {...req.body,id}

   await userUpdateValidation.validateAsync(body).then(async response2=>{
    const data = {firstName,lastName,password,email} = req.body;
    const response = await UserService.updateUser(1,data);
    return res.status(200).json(response);
   }).catch(error=>{
    return   res.status(400).send(error.details);
  });
}

module.exports.delete = async function(req,res)
{
   await UserService.deleteUser(req.params.id)

   return res.status(204).json({})
}