const express=require("express")
require("./config/database")
const app=express();
const { adminAuth,loginAuth } = require("./middleware/auth");
const User=require("./models/user")
app.use("/admin",adminAuth);
app.use(express.json());
app.get("/admin/getAllData",(req,res)=>{
    res.send("All the data")
});
app.use("/admin/delAllData",(req,res)=>{
    res.send("All the data deleted..")
})
app.post("/signup",async(req,res)=>{
    const user=new User({
        fristName: req.body.fristName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        password: req.body.password,
        gender: req.body.gender,
        skill:req.body.skill,
        photoUrl:req.body.photoUrl,
    })
    try{
        await user.save();
    res.send("User Added successfully");
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
    const userId=req.body.userId;
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
            throw new error("Skills cannot be more than 10")
        }
        await User.findByIdAndUpdate({_id:userId},data,{
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
