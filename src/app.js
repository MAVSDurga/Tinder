const express=require("express")
const app=express();

app.use("/Home",(req,res)=>{
    res.send("Hello aruna!")
});
app.use("/Login",(req,res)=>{
    res.send("Hello surya!")
});
app.use("/Regi",(req,res)=>{
    res.send("Hello Durga!")
});

app.listen(3000,()=>{
    console.log("hello");
});
