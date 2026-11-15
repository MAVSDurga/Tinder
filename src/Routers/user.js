const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middleware/auth");
const ConnectionRequest=require("../models/connectionrequest");
const User=require("../models/user");
USER_DATA="firstName lastName skills photoUrl email about"
userRouter.get("/request/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user
        const connectionRequests=await ConnectionRequest.find({
            touserId:loggedInUser._id,
            status:"interested"}).populate("fromuserId",USER_DATA);
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
userRouter.get("/user/feed",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
             $or:[
                {fromuserId:loggedInUser._id},
                {tousreId:loggedInUser._id}
            ]
            
        });
        const hideUserIds=new Set();
        connectionRequests.forEach((req)=>{
            hideUserIds.add(req.fromuserId.toString());
            hideUserIds.add(req.touserId.toString());
        });
        const page=parseInt(req.query.page) ||1
        let limit=parseInt(req.query.limit) ||10
        limit=limit>50?50:limit;
        const skip=(page-1)*limit;
        const Users=await User.find({
           $and:[
            {_id:{$nin:Array.from(hideUserIds)}},
            {_id:{$ne:loggedInUser._id}},
           ],
        }).select(USER_DATA).skip(skip).limit(limit);

        res.json({
            message:"Data fetched successfully",
            data:Users,
        })
    }catch(err){
        res.status(400).send("Error:"+err.message);
    }
});

module.exports=userRouter