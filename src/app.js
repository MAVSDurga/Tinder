const express=require("express")
const app=express();
const { adminAuth } = require("../middleware/auth");
app.use("/admin",adminAuth);
app.get("/admin/getAllData",(req,res)=>{
    res.send("All the data")
})
app.use("/admin/delAllData",(req,res)=>{
    res.send("All the data deleted..")
})
app.listen(3000,()=>{
    console.log("hello");
});
