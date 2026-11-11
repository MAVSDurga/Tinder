const express=require("express")
require("./config/database")
const app=express();
const bcrypt=require('bcrypt')
const User=require("./models/user")
const cookieParser = require("cookie-parser");
const jwt=require('jsonwebtoken');
const user = require("./models/user");
app.use(express.json());
app.use(cookieParser());
const authRouter=require("./Routers/authentication");
const profileRouter=require("./Routers/Profile");
const requestRouter=require("./Routers/request");
const userRouter=require("./Routers/user"); 
app.use(authRouter);
app.use(profileRouter);
app.use(requestRouter);
app.use(userRouter);
app.get("/user",async(req,res)=>{
    try{
        const userEmail=req.body.emailId;
        const users=await User.findOne({emailId:userEmail})
        if(users.length===0){
            res.status(404).send("user not found");
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send("Somthing went wrong..")
    }
});
app.patch("/user/:_Id",async(req,res)=>{
    const userId=req.params._IdId;
    const data=req.body;
    try{
        const ALLOWED_UPDATES=[
        "photoUrl",
        "about",
        "gender",
        "age",
    ];
        const isUpdateAllowed=Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k));
        if (!isUpdateAllowed){
            res.status(400).send("Updates not allowed");
        }
        if(data?.skill?.length>10){
            throw new Error("Skills cannot be more than 10")
        }
        await User.findByIdAndUpdate(userId,data,{
            returnDocument:"after",
            runValidators:true,
        })
        return res.send("User updated successfully");
    }catch (err){
        console.log(err)
        res.status(400).send("Update failed"+err.message);
    }
});
app.listen(3000,()=>{
    console.log("hello");
});
