const express=require("express")
const mongoose=require("mongoose");
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://mallipamulaaruna_db_user:fMoobISFaQQAOCji@cluster0.nhhdltj.mongodb.net/")
}
connectDB().then(()=>{
    console.log("Database connection established..")
})
.catch((err)=>{
    console.error("Database cann't connected!")
    console.log(err.message)
})