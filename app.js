const express = require('express');
const dotenv = require("dotenv")

dotenv.config();

global.configFile = function(fileName)
{
    const fileResponse = require('./config/'+fileName)

    return fileResponse
}

const app = express();
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')
//const exp = require('constants');
const auth = require('./app/http/middlewares/auth/jwtAuth');
const { func } = require('joi');
app.use(express.json())
app.use('/users',auth.verifyToken,userRouter)
app.use('/auth',authRouter)
app.listen(3000,()=>{
    console.log('App is running')
})