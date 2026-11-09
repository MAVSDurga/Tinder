const express=require("express")
const requestRouter=express.Router();
const { userAuth } = require("../middleware/auth");
requestRouter.post("/connectionrequest",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        console.log("Sending connection successfully!")
        res.send(user.firstName+"sent Connection request!")

    }catch(err){
        res.status(400).send("Error:" + err.message);
    }
});
module.exports=requestRouter;
