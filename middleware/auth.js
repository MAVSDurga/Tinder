const adminAuth=(req,res,next)=>{
    //Logic of checking if the request is authorized to get the data 
    const token="xyzsfsdfhkkjhff"
    const isAdminAuthorized=token==="xyz"
    if(!isAdminAuthorized){
        res.status(401).send("your not a authorized user")
    }
    else{
        next();
    }
}
const loginAuth=(req,res,next)=>{
    const token="xyz"
    const isAdminAuthorized=token==="xyz"
    if(isAdminAuthorized){
        res.send("Login successfully..")
    }
    else{
        next();
    }
}
module.exports={
    adminAuth,
    loginAuth,
}