const jwt = require("jsonwebtoken");

module.exports.generateToken = function(user){
    const token = jwt.sign({userId:user.id},process.env.SECRET_KEY,{expiresIn:'1d'})
    return token
}

module.exports.verifyToken = function(req,res,next){
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({error:"Unauthorizated"})
    }

    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.userId = decoded.userId
        next();
    }catch(err)
    {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports.checkPassword = async function (plaintextPassword, hashedPassword) {
      const result = await bcrypt.compare(plaintextPassword, hashedPassword);
      if (result) {
        return true;
      } else {
        return false;
      }
  }