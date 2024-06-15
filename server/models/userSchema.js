import mongoose from "mongoose";
const userSchema  = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    
  },
  photo:{
    type:String,
    required:true
  },
  role:{
    type:Number,
    default:0
  }
})
const userModel = mongoose.model('Users',userSchema)
export default userModel