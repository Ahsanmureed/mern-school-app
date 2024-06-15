import userModel from "../models/userSchema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const loginController = async(req,res)=>{

    const {email,password}= req.body;
    // validation
    if(!email || !password){
      return res.status(401).json({
success:false,
message:'Please Fill Required Fields'
      })
    }
    // email check 
    const user = await userModel.findOne({email});
      if(!user){
   return res.status(401).json({
   success:false,
   message:'Email is incorrect'
   })
      }
      // password check
      const passwordCheck = await bcrypt.compare(password,user.password);
      if(!passwordCheck){
        return res.status(401).json({
          success:false,
          message:'Password is incorrect'
      })
      }
   // token
   const token= jwt.sign({_id:user._id,username:user.username,email:user.email,role:user.role,photo:user.photo}, process.env.JWT_KEY,{expiresIn:'1hr'})
   const {password:pass,...info}=user._doc
   res.cookie("token",token,{
    sameSite: 'none',
    httpOnly:true,
    secure:true
   }).status(201).json(
    info
   )
 
}
const registerController= async (req,res)=>{
 try {
  const {username,email,password,photo}= req.body;
  if(!username || !email || !password || !photo){
    return res.status(401).json({
      success:false,
      message:"Please Fill Required Fields"
    })
  }
  // username unique check
  const userName = await userModel.findOne({username})
  if(userName){
    return res.status(401).json({
success:false,
message:"Username must be unique"
    })
  }
    //  email unique check
    const emailCheck = await userModel.findOne({
      email
    })
    if(emailCheck){
      return res.status(401).json({
        success:false,
        message:"Email is alreadye registered"
            })
    }
  // password hashed
  const hashedPassword= await bcrypt.hash(
    password,10
  )

  const saveUser = new userModel({username,email,password:hashedPassword,photo})
  saveUser.save();
  return res.status(201).json({
    success:true,
    message:"Sign Up Successfully"
        })
 } catch (error) {
  return res.status(500).json({
    success:false,
    message:"Internal Server Error"
  })
}
}
const logoutController  =async (req,res)=>{
  try{
   
    await res.cookie("token",{  maxAge: 0 },{
      path:"/",
      sameSite: 'none',
      httpOnly:true,
      secure:true
    }).status(200).json({
      success:true,
      message:"User Logout Successfully"
    })

}
catch(err){
    res.status(500).json(err)
}

}
const refetchUserController= (req,res)=>{
  const token= req.cookies.token;
  if(!token){
    if(!token){
      return res.status(402).json({
        success:false,
        message:"Token not found"
      })
    }
    }
     jwt.verify(token,process.env.JWT_KEY,{},(err,user)=>{
      if(err){
        return res.status(401).json({
          success:false,
          message:'Unauthorized Person'
        })
      }
      return res.status(200).json({
        user
      })
     })
 
}
const allUserController =async(req,res)=>{
try {
  const students= await userModel.find({});
  return res.status(200).json({
    success:true,
    message:"All Students Successfully Fetched",
    students
  });
}  catch (error) {
  return res.status(500).json({
    success:false,
    message:"Internal Server Error"
  })
}
}

const singleUserController =  async(req,res)=>{
 
    const data = await userModel.findById(req.params.id,('-password'))
    return res.status(200).json({
      success:true,
      message:"Successfully fetched single user",
      data
    })
}
const updateUserController = async(req,res)=>{
  if(req.body.password){
    req.body.password=await bcrypt.hash(req.body.password,10)
  }
  const update= await userModel.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
 
  const user = await userModel.findById(req.params.id);

 const token= jwt.sign({_id:user._id,username:user.username,email:user.email,role:user.role,photo:user.photo}, process.env.JWT_KEY,{expiresIn:'1hr'})
 
 const {password:pass,...info}=user._doc
 console.log(info);
 res.cookie("token",token,{
  sameSite: 'none',
  httpOnly:true,
  secure:true
 }).status(201).json(
  info
 )
}
const deleteUserController=async (req,res)=>{
const deleteUser = await userModel.findByIdAndDelete(req.params.id)
return res.status(200).json({
  success:true,
  message:"Successfully deleted  user",

})
}
export {loginController,registerController,logoutController,refetchUserController,allUserController,singleUserController,updateUserController,deleteUserController}