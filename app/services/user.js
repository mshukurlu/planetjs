// services/user.js
const User = require('../models/user');
const bcrypt = require("bcrypt")
const jwtAuth = require("../http/middlewares/auth/jwtAuth")
class UserService {
  static async getAllUsers() {
    const users = await User.getAll();

    const filteredUsers = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return filteredUsers
  }

  static async getUserById(id) {
    const user = await User.getById(id);
    return user;
  }

  static async createUser(data) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data['password'] = hashedPassword;
    const userId = await User.create(data);

    let response = {};
    if (userId > 0) {
      //console.log("user")
      // console.log(User.getById(userId))

      const userInfo = await User.getById(userId);
      delete userInfo.password;
      response = {
        ...userInfo,
        'status': 201,
        "message": "Created successfully"
      }
    } else {
      response = {
        status: 500,
        "message": "Server error"
      }
    }

    // console.log(response)
    return response;
  }

  static async updateUser(id, data) {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data['password'] = hashedPassword;
    const success = await User.update(id, data);
    if (success) {
      const userData = User.getById(id);
      return {
        data: { ...userData },
        status: 200,
        message: "Updated successfully"
      }
    } else {
      return {
        status: 500,
        message: "Server error"
      }
    }
  }

  static async deleteUser(id) {
    const success = await User.delete(id);
    return success;
  }

  static async login(email,password){

    const getUserByEmail = await User.getByEmail(email);

    //console.log(getUserByEmail);

    if(getUserByEmail){
    const compareResult = await bcrypt.compare(password,getUserByEmail.password);

    if(compareResult){
      return {
        "status":200,
        "message":"Logged in",
        "token":jwtAuth.generateToken(getUserByEmail)
      };
    }else{
      return {
        "status":401,
        "message":"Email or password is incorrect!"
      }
    }

    }else{
      return {
        'status':404,
        "message":"Email not found in our database!"
      }
    }

    

  }
}


module.exports = UserService;
