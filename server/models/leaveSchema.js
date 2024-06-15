import mongoose from "mongoose";
const LeaveSchema= new mongoose.Schema({
      reason:{
        type:String,
        required:true
      },
      student:{
        type:mongoose.Schema.ObjectId,
        ref:"Users"
      },
      status:{
        type:String,
        default:"Pending",
        enum:["Pending","Proved","Rejected"]
      }
},{timestamps:true})

const LeaveModel = mongoose.model("Leaves",LeaveSchema)
export default LeaveModel