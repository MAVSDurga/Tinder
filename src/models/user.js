const mongoose=require("mongoose");
const validator=require("validator")
const userSchema= new mongoose.Schema({
        firstName:{
            type:String,
            required:true,
            minLength:4,
            maxLength:50,
        },
        lastName:{
            type:String,
        },
        emailId:{
            type:String,
            lowercase:true,
            required:true,
            unique:true,
            trim:true,
            // validate(value){
            //     if(!validator.isEmail(value)){
            //         throw new error("Invalid e-mail Addres")
            //     }
            // }
        },
        password:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            mix:4,
        },
        gender:{
            type:String,
            validate(value){
                if(!["Male","Female","other"].includes(value)){
                    throw new Error("Gender data is not valid")
                }
            },
        },
        photoUrl:{
            type:String,
            // default:"https://www.example.com/index.htmlalue",
            validate(value){
               if(!validator.isURL(value)){
                    throw new error("Invalid URL type")
                } 
            }
        },
        about:
        {
            type:String,
            default:"This is the defaultof user",
        },
        skill:{
            type:[String],
        },
    },
    {
        timestamps:true
    },
);
module.exports=mongoose.model("user",userSchema)