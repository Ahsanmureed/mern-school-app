import LeaveModel from "../models/leaveSchema.js";

const addLeaveController= async(req,res)=>{
try {
  const {reason,student}= req.body;
  if(!reason){
        return res.status(401).json({
          success:false,
          message:"Please Provide the reason"
        })
  }
  const newLeave= new LeaveModel({reason,student})
  await newLeave.save();
  return res.status(201).json({
      success:true,
      newLeave,
      message:"Successfully sent the leave"
  })
} catch (error) {
  return res.status(500).json({
    success:false,
    message:"Internal Server Error"
})
}
}

const updateLeaveController=async(req,res)=>{
 try {
  const update= await LeaveModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
  return res.status(200).json({
    update,
    success:true,
    message:"Successfully Updated the leave"
  })
 }  catch (error) {
  return res.status(500).json({
    success:false,
    message:"Internal Server Error"
})
}
}
const deleteLeaveController = async(req,res)=>{
  const deleteLeave = await LeaveModel.findByIdAndDelete(req.params.id)
  return res.status(200).json({
    success:true,
    message:"Successfully deleted the leave"
  })
}
const allLeaveController=async(req,res)=>{
 try {
  const allLeaves= await LeaveModel.find({}).populate("student", ("-password -photo"));
  return res.status(200).json({
    success:true,
    allLeaves,
    message:"Successfully fetched all leaves"
  })
 }  catch (error) {
  return res.status(500).json({
    success:false,
    message:"Internal Server Error"
})
}
}
const userLeaveController = async(req,res)=>{
  try {
    const userLeaves= await LeaveModel.find({student:req.params.id}).populate("student", ("-password -photo"))
    return res.status(200).json({
      success:true,
      userLeaves,
      message:"Successfully fetched user leaves"
    })
  }  catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
  })
  }
}
export {userLeaveController,addLeaveController,updateLeaveController,deleteLeaveController,allLeaveController}