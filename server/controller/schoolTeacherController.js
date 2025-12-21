
const schoolTeacher=require("../model/schoolTeacherController");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const secretKey="ashishrahulmanishjiteshkavishpalkesh"

exports.teacherSignup=async(req,res)=>{
  const {name,email,subject,password}=req.body;
  console.log(`>>>subject>>>`,subject);
  if(!(name&&email&&subject&&password)){
    return res.status(400).send({message: "all input field are required"});
  }

  const salt=bcrypt.genSaltSync(10);
  const hash=bcrypt.hashSync(password,salt);

  
  const data = {
    name,email,subject,password:hash
  }

  const signupUser=await schoolTeacher.create(data);
  console.log(`>>signup>>`,signupUser)
    return res.status(202).send(signupUser)
  }


exports.teacherLogin=async(req,res)=>{
  const {email,password}=req.body;
  if(!(email&&password)){
    return res.status(400).send({message: "all input field are required"});
  }

  const existUser=await schoolTeacher.findOne({email});

  const isMatch= await bcrypt.compare(password,existUser.password);
  console.log(`>>>isMatch>>`,isMatch);

  if(!isMatch){
    return res.status(400).send({message: "invalid user"});
  }

  const token = jwt.sign({ email }, secretKey, {expiresIn: "7d"});
    console.log("<<<<token<<<", token);
    res
      .status(200)
      .json({ message: "login successful", 
        data: existUser,token
      });
}


exports.teacherReset=async(req,res)=>{
  const {email,oldPassword,newPassword}=req.body;
  if(!(email&&oldPassword&&newPassword)){
    return res.status(400).send({message: "all input field are required"})
  }

  const teacherExist=await schoolTeacher.findOne({email});
  if(!teacherExist){
    return res.status(400).send({message: "invalid user please signup first"})
  }

  const dbPassword=teacherExist.password;

  const teacherNewPassword=await bcrypt.compare(oldPassword,dbPassword);
  if(!teacherNewPassword){
    return res.status(400).send({message: "invalid password"});
  }

  const salt=bcrypt.genSaltSync(10);
  const hash=bcrypt.hashSync(newPassword,salt);
  const data={
    password: hash
  }

  const id=teacherExist._id;
  const result=await schoolTeacher.findOneAndUpdate(id,data);
  if(result){
    return res.status(202).send({message: "reset successfully",
      data: result
    })
  }

}

exports.teacherForget=async(req,res)=>{
  const {email,newPassword}=req.body;
  if(!(email&&newPassword)){
    return res.status(400).send({message: "all input field are required"});
  }

  const alreadyEmail=await schoolTeacher.findOne({email});
  console.log(`>>>alreadyEmail>>`,alreadyEmail);

  if(!alreadyEmail){
    return res.status(400).send({message: "invalid user"});
  }

  const salt=bcrypt.genSaltSync(10);
  const hash=bcrypt.hashSync(newPassword,salt);

  const data={
    password: hash
  }

  const id=alreadyEmail._id;
  const result=await schoolTeacher.findOneAndUpdate(id,data);
  console.log(`>>>>>result>>>`,result);

  if(result){
    return res.status(202).send({message: "forget successfully",result});
  }

}


