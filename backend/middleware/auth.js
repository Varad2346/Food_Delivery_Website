import jwt from "jsonwebtoken"

const authMiddleware=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,messsage:"not authrized login again"})
    }
    try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id;
        next();
    }
    catch(error){
        console.log(error);
        return res.json({success:false,Error:"error"})

    }
}
export default authMiddleware;