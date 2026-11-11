const mongoose=require("mongoose");
const connectionRequestSchema=new mongoose.Schema({
    fromuserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    touserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:["ignored","interested","accepted","rejected"],
    },
},{timestamps:true});
connectionRequestSchema.index({fromuserId:1,touserId:1});
connectionRequestSchema.pre("save",function(){
        if((this.fromuserId).equals(this.touserId)){
            throw new Error("Cannot send connoction request to yourself");
        }
});

module.exports=mongoose.model("ConnectionRequest",connectionRequestSchema);