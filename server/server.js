const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();
const port=2727;

app.use(cors());
app.use(express.json());
const mongoURL=`mongodb://127.0.0.1:27017/school`;

mongoose.connect(mongoURL)
.then(()=>console.log(`mongodb is connected`))
.catch((err)=>console.log(err));


const schoolUserController=require("./routes/schoolUserController");
app.use("/schoolUser",schoolUserController);

app.listen(port,()=>{
  console.log(`server is running on ${port}`);
})