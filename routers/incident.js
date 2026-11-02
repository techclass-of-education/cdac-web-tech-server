const express=require("express")
const router=express.Router()
const incidentModel=require("../models/incidentModel.js")
const { default: mongoose } = require("mongoose")

router.get("/",async (req,res)=>
{
    const incidents=await incidentModel.find()
    if(incidents.length==0)
    {
        return res.json({msg:"incidents not found"})
    }
    res.json({msg:"incidents found", incidents})
})


router.get("/:id",async (req,res)=>  ///:id   params
{
    const id=req.params.id
    const incident=await incidentModel.findById(new mongoose.Types.ObjectId(id))
    if(!incident)
    {
        return res.json({msg:"incident not found",user:null})
    }
    res.json({msg:"incident found",incident})
})



router.post("/",async (req,res)=>
{
    console.log(req.body)
    const savedIncident=await incidentModel.create(req.body)
    if(!savedIncident.title)
    {
        return res.send("incident not saved")
    }
    res.json({msg:"incident saved",savedIncident})
})

router.put("/:id",async (req,res)=>
{
    const id=req.params.id
    const incident=req.body

    const updatedIncident=await incidentModel.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id),
        incident
    )
    if(!updatedIncident)
    {
          return res.json({msg:"Incident not udpate"})
    }
    res.json({msg:"Incident full update",updatedIncident})
})

router.patch("/",(req,res)=>
{
    res.send("incident partial update")
})

router.delete("/:id",async (req,res)=>
{
     const id=req.params.id
    const incident=await incidentModel.findByIdAndDelete(
        new mongoose.Types.ObjectId(id))
   
    if(!incident)
    {
        return res.json({msg:"incident not found"})
    }
    res.json({msg:"incident deletd"})
})

module.exports=router
