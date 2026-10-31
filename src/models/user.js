const mongoose=require("mongoose");
const userSchema= new mongoose.Schema({
    fristName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
    },
    password:{
        type:String,
    },
    age:{
        type:Number,
    },
    grnder:{
        type:String
    }
});
module.exports=mongoose.model("user",userSchema)