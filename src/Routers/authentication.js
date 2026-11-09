const express=require("express")
const authRouter=express.Router();
const {signupvalidation}=require("../utils/validation")
const bcrypt=require('bcrypt')
const User=require("../models/user")
const cookieParser = require("cookie-parser");
const jwt=require('jsonwebtoken');
authRouter.post("/signup",async(req,res)=>{
    // Data validsation

    try{
        signupvalidation(req);
        const {firstName,lastName,password,emailId}=(req.body)
        const passwordHash=await bcrypt.hash(password,10)
        console.log(passwordHash)
        const user=new User({
            firstName,
            lastName,
            password:passwordHash,
            emailId,
        })
        await user.save();
        res.send("User Added successfully");
    }catch(err){
        res.status(400).send("Error:"+err.message);
    }

});
authRouter.post("/login",async(req,res)=>{
    try{
        const {emailId,password}=(req.body)
        const user =await User.findOne({emailId})
        if(!user){
            throw new Error("Invalid cradentials(email).")
        }
        console.log("User:", user);
        const isPasswordValid = await user.validatePassword(password);
        console.log("Password Match:", isPasswordValid);
        if(!isPasswordValid){
            throw new Error("Invalid cradentials.")
        }
        else{
            const token=await user.getJWT()
            res.cookie('token',token)
            res.send("Login succussfully!")
        }
        console.log(token);
    }catch(err){
        res.status(400).send("Error saving the user:"+err.message);
    }
});
authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    })
    res.send("logout succussfully")
})
module.exports=authRouter;