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
const validateeditfiledsdata=(req)=>{
    const editAllowedData=[
        "firstName",
        "lastName",
        "about",
        "gender",
        "age",
        "photoUrl"
    ];
    const iseditAllowed=Object.keys(req.body).every((field)=>editAllowedData.includes(field))
    return iseditAllowed;
}
const passwordValidation = async (user, password) => {
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
        throw new Error("Current password is incorrect");
    }

    return true;
};
module.exports={
    signupvalidation,
    validateeditfiledsdata,
    passwordValidation,
}