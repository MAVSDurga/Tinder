const validator=require('validator')
const signupvalidation=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName||!lastName){
        throw new Error("Name Must be required!")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Enter valid EmailId!")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter strong password!")
    }

}
module.exports={
    signupvalidation,
}