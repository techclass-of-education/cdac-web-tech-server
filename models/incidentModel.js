const mongoose=require("mongoose")

const incidentSchema=new mongoose.Schema(
{
    user:{type:String,required:true},
    title:{type:String,required:true},
    category:{type:String,required:true},
    severity:{type:String,required:true},
    status:{type:String,required:true},
    description:{type:String,required:true}
},
{
    timestamps:true  //createdAt updatedAt
}
)

const incidentModel=mongoose.model("incident",incidentSchema)

module.exports=incidentModel