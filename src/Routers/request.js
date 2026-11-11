const express=require("express")
const requestRouter=express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest=require("../models/connectionrequest");
const User=require("../models/user");
requestRouter.post("/connectionrequest",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        console.log("Sending connection successfully!")
        res.send(user.firstName+"sent Connection request!")

    }catch(err){
        res.status(400).send("Error:" + err.message);
    }
});
requestRouter.post("/request/send/:status/:touserId",userAuth,async(req,res)=>{
    try{
        const fromuserId=req.user._id;
        const touserId=req.params.touserId;
        const status=req.params.status;
        const connectionRequest=new ConnectionRequest({
            fromuserId,
            touserId,
            status
        });
        user=req.user;
        const allowedstatus=["ignored","interested"];
        if(!allowedstatus.includes(status)){
            return res.status(400).json({
                message:"Invalid status value"+status
            });
        }
        const touser=await User.findOne({_id:touserId});
        if(!touser){
            return res.status(404).json({
                message:"User not found"
            });
        }
        
        const existingConnectionRequest=await ConnectionRequest.findOne({
            $or:[
                {fromuserId:fromuserId,touserId:touserId},
                {fromuserId:touserId,touserId:fromuserId}
            ]
        });
        if(existingConnectionRequest){
            return res.status(400).json({
                message:"Connection request already exists"
            });
        }
        const data=await connectionRequest.save();
        res.json({
            message:"Connection request sent successfully",
            data
        });
    }catch(err){
        res.status(400).send("Error:" + err.message);
        
    }
});
requestRouter.post("/request/:status/:touserId",userAuth,async(req,res)=>{
    try{
        const loggedInUserId=req.user._id;
        const{status,touserId}=req.params;
        const allowedstatus=["accepted","rejected"];
        if(!allowedstatus.includes(status)){
            return res.status(400).json({message:"Invalid status value"+status});
        }
        const connectionRequest=await  ConnectionRequest.findOne({
            fromuserId:touserId,
            touserId:loggedInUserId._id,
            status:"interested",
        })
        if(!connectionRequest){
            return res.status(404).json({message:"Connection request not found"});
        }
        connectionRequest.status=status;
        const data=await connectionRequest.save();
        res.json({
            message:"Connection request "+status+" successfully",
            data
        });
    }catch(err){
        console.log(err.stack)
        res.status(400).send("Error:" + err.message);
    }
});
module.exports=requestRouter;
