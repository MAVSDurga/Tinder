const adminAuth=(req,res,next)=>{
    //Logic of checking if the request is authorized
    const token="xyzsfsdfhkkjhff"
    const isAdminAuthorized=token==="xyz"
    if(!isAdminAuthorized){
        res.status(401).send("your not a authorized user")
    }
    else{
        next();
    }
}
module.exports={
    adminAuth,
}