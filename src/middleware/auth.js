const User = require("../models/user");
const jwt = require("jsonwebtoken");
const userAuth=async(req,res,next)=>{
    try{
        console.log(req.cookies);
        const { token } = req.cookies;
        if(!token){
            throw new Error("Inavalid Token..")
        }
        console.log("TOKEN =", token);
        
        const decodedObj = jwt.verify(token,"DEV@2564tinder");
        const{_id}=decodedObj;
        const user=await User.findById(_id);
        if(!user){
            throw new Error("User not found")
        }
        req.user = user;
        next();
    }catch(err){
        res.status(400).send("Error: " + err.message);
    }
}
module.exports={
    userAuth,
}