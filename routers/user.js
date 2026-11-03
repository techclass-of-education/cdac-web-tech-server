const express=require("express")
const router=express.Router()
const userModel=require("../models/userModel.js")
const { default: mongoose } = require("mongoose")
const jwt=require("jsonwebtoken")
const {authVerifyMiddleware}= require("../config/jwtVerify.js")
const JWTSecretKey="this-is-a-secret-jwtkey-for-tokens"



router.get("/",authVerifyMiddleware,async (req,res)=>
{
   const users=await userModel.find()
    if(users.length==0)
    {
        return res.json({msg:"users not found"})
    }
    res.json({msg:"users found", users})
})

router.get("/:id",authVerifyMiddleware,async (req,res)=>  ///:id   params
{
    const id=req.params.id
    const user=await userModel.findById(new mongoose.Types.ObjectId(id))
    if(!user)
    {
        return res.json({msg:"user not found",user:null})
    }
    res.json({msg:"user found",user})
})


router.post("/auth",async(req,res)=>
{
    const {email,password}=req.body
    const user=await userModel.findOne({
        email:email
    })
    
   

    if(!user)
    {
        return res.json({msg:"email-id not matched",auth:false})
    }

    if(password===user.password)
    {
        // successfull login JWT assign
        const signData={id:user._id,email:user.email,name:user.name}

        const token=jwt.sign(signData,JWTSecretKey)

        res.cookie("token",token,{
            maxAge:60*60*1000,  //1 hr
            httpOnly:true,  // only for http
            secure:false,  // for https true
            sameSite:"lax"
        })

        res.json({msg:"user login successfull",auth:true})
    }else
    {
         res.json({msg:"user login failed",auth:false})
    }



})

router.post("/",async (req,res)=>
{
    console.log(req.body)
    const savedUser=await userModel.create(req.body)
    if(!savedUser.name)
    {
        return res.send("user not saved")
    }
    res.json({msg:"user saved",savedUser})
})

router.put("/:id",authVerifyMiddleware,async (req,res)=>
{
    const id=req.params.id
    const user=req.body

    const updatedUser=await userModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id),user)
    if(!updatedUser)
    {
          return res.json({msg:"user not udpate"})
    }
    res.json({msg:"user full update",updatedUser})
})

router.patch("/",authVerifyMiddleware,(req,res)=>
{
    res.send("user partial update")
})

router.delete("/:id",authVerifyMiddleware,async(req,res)=>
{
   const id=req.params.id
    const user=await userModel.findByIdAndDelete(new mongoose.Types.ObjectId(id))
   
    if(!user)
    {
        return res.json({msg:"user not found"})
    }
    res.json({msg:"user deletd"})
})

module.exports=router
