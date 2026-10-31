const express=require("express")
require("./config/database")
const app=express();
const { adminAuth,loginAuth } = require("./middleware/auth");
app.use("/admin",adminAuth);
app.use("/user",loginAuth);
app.get("/admin/getAllData",(req,res)=>{
    res.send("All the data")
});
app.use("/admin/delAllData",(req,res)=>{
    res.send("All the data deleted..")
})
app.get("/user",(req,res)=>{
    res.status(401).send("Unauthorized user login")
})
app.listen(3000,()=>{
    console.log("hello");
});
