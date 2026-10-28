const express=require("express")
const app=express();

app.use("/Home",(req,res)=>{
    res.send("Hello aruna!")
});
app.get("/Login",(req,res)=>{
    res.send("Hello surya!")
});
app.post("/Regi",(req,res)=>{
    res.send("Hello Durga!")
});
app.patch("/pss",(req,res)=>{
    res.send("Hello Veera!")
});
app.delete("/dle",(req,res)=>{
    res.send("Response deleted")
});
app.listen(3000,()=>{
    console.log("hello");
});
