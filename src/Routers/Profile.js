const express=require("express")
const profileRouter=express.Router();
const bcrypt=require('bcrypt')
const { userAuth } = require("../middleware/auth");
const {validateeditfiledsdata,passwordValidation}=require("../utils/validation")
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.status(400).send("Error: " + err.message);
    }
});
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateeditfiledsdata(req)){
            throw new Error("Invalid edit request")
        }
        console.log(validateeditfiledsdata(req))
        const loggedInUser=req.user;
        console.log(loggedInUser);
        Object.keys(req.body).forEach((key)=>loggedInUser[key]=req.body[key])
        console.log(loggedInUser);
        await loggedInUser.save();
        res.send(`${loggedInUser.firstName} your data is updated successfully`);
    }catch(err){
        res.status(400).send("Error: " + err.message);
    }
});
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const { password, newPassword } = req.body;
        const loggedInUser = req.user;
        console.log(req.body)
        await passwordValidation(loggedInUser, password);
        const passwordHash = await bcrypt.hash(newPassword, 10);
        loggedInUser.password = passwordHash;
        await loggedInUser.save();
        res.send("Password updated successfully");
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});
module.exports=profileRouter;