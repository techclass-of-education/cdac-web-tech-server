const express=require("express")
const {connectToMongoDB,disconnectFromMongoDB}=require("./config/db.js")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const app=express()

app.use(cors({
    origin:"http://localhost:5173"
}))

app.use(cookieParser())
// routers middleware  req  mid   res
const userRouter=require("./routers/user.js")
const incidentRouter=require("./routers/incident.js")
app.use(express.json()) // allow json data in server and store in req.body

app.use("/user",userRouter)  
//get  http://localhost:5000/user
app.use("/incident",incidentRouter)  
//get  http://localhost:5000/incident

app.get("/",(req,res)=>
{
    
    res.send("Server started link /")
})


app.listen(5000,()=>{  //loop
    connectToMongoDB().then(function()
    {
        console.log("database connected...")
    }).catch(function(err){
        console.error(err)
    })
    console.log("server started on http://localhost:5000")
})