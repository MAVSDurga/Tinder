const express=require("express")
require("./config/database")
const app=express();
const bcrypt=require('bcrypt')
const { adminAuth,loginAuth } = require("./middleware/auth");
const User=require("./models/user")
const {signupvalidation}=require("./utils/validation")
const cookieParser = require("cookie-parser");
const jwt=require('jsonwebtoken');
app.use("/admin",adminAuth);
app.use(express.json());
app.use(cookieParser());
app.get("/admin/getAllData",(req,res)=>{
    res.send("All the data")
});
app.use("/admin/delAllData",(req,res)=>{
    res.send("All the data deleted..")
})
app.post("/signup",async(req,res)=>{
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
app.get("/profile", async(req,res)=>{
    try{
        console.log(req.cookies);

        const { token } = req.cookies;
        if(!token){
            throw new Error("Invalid token")
        }
        console.log("TOKEN =", token);

        const decodedMsg = jwt.verify(
            token,
            "DEV@2564tinder"
        );
        const{_id}=decodedMsg;
        const user=await User.findById(_id);
        if(!user){
            throw new Error("User doesnot exists")
        }

        res.send(user);
        res.send(decodedMsg);
    }catch(err){
        res.status(400).send("Error: " + err.message);
    }
});
app.post("/login",async(req,res)=>{
    try{
        const {emailId,password}=(req.body)
        const user =await User.findOne({emailId})
        if(!user){
            throw new Error("Invalid cradentials(email).")
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            throw new Error("Invalid cradentials.")
        }
        else{
            const token=await jwt.sign({_id:user._id},"DEV@2564tinder")
            res.cookie('token',token)
            res.send("Login succussfully!")
        }
        // const token=jwt.sign({_id:'user._id'},'DEV@Tinder%234'); 
        console.log(token);
    }catch(err){
        res.status(400).send("Error saving the user:"+err.message);
    }
})
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
