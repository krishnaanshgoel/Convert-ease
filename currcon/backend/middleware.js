const jwt=require("jsonwebtoken")
const {JWT_Secret}=require("./config")

const authmiddleware=(req,res,next)=>{
    const auth=req.headers.authorization;
    if(!auth || !auth.startsWith('Bearer ')){
        return res.json({
            msg:"no authorisation"
        })
    }
    const token=auth.split(" ")[1];
    try{
        const decoded=jwt.verify(token,JWT_Secret);
        req.userId=decoded.userId
        next()
    }
    catch(err){
        return res.json({msg: "invalid"})
    }
}
module.exports=authmiddleware