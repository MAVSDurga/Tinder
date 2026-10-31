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
        fristName:"Arun",
        lastName:"Naidu",
        emailId:"Arunnaidu@gamil.com",
        password:"Arun@123"
    });
    await user.save();
    res.send("User Added successfully");
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
app.patch("/user",async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body.user;
    try{
        await User.findByIdAndUpdate({_id:userId},data)
        res.send("User updated successfully");
    }catch (err){
        console.log(err)
        res.status(400).send("Somthing went wrong");
    }
});
app.listen(3000,()=>{
    console.log("hello");
});
