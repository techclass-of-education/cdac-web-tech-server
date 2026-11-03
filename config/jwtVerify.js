const jwt=require("jsonwebtoken")
const JWTSecretKey="this-is-a-secret-jwtkey-for-tokens"
const authVerifyMiddleware=(req,res,next)=>
{
        const token=req.cookies.token
        if(!token)
        {
            return res.json({msg:"token not found"})
        }
        const decoded=jwt.verify(token,JWTSecretKey)
        const user=decoded
        req.user=user
        next()   //end middleware excution
}

module.exports={authVerifyMiddleware}