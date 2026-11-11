const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middleware/auth");
const ConnectionRequest=require("../models/connectionrequest");
const User=require("../models/user");
userRouter.get("/request/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user
        const connectionRequests=await ConnectionRequest.find({
            touserId:loggedInUser._id,
            status:"interested"}).populate("fromuserId",["firstName", "lastName"]);
        res.send(connectionRequests);
            return res.json({
                message:"Data fetched successfully",
                data:connectionRequests,
            })
    }catch(err){
        res.status(400).send("Error:"+err.message);
    }
});
userRouter.get("/user/connection",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
            $or:[
                {touserId:loggedInUser._id,status:"accepted"},
                {fromuserId:loggedInUser._id,status:"accepted"}
            ]
        })
        const data=connectionRequests.map((row)=>row.fromuserrId)
        res.json({
            message:"Data fetched successfully",
            data:data,
        })
    }catch(err){
        res.status(400).send("Error:"+err.message);
    }
})

module.exports=userRouter