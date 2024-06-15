import {attendenceModel} from '../models/attendance.js'

const takeAttendeceController = async (req, res) => {
  const { students } = req.body; 
  try {
    const attendanceData = students.map(student => ({
      student: student._id,
      date: new Date(), 
      status: 'Absent' 
    }));
    const insertedAttendance = await attendenceModel.insertMany(attendanceData);
    res.status(201).json(insertedAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const updateAttendenceController= async(req,res)=>{

  const update = await attendenceModel.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
  return res.status(200).json({
    success:true,
   update,
    message:"Successfully Mark the Attendence "
  })


}
const deleteAttendenceController= async(req,res)=>{
   try {
    const deleteAttendence= await attendenceModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success:true,
     
      message:"Successfully deleted Attendence sheet"
    })
   } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
  })
  }
}
const allAttendenceSheet= async(req,res)=>{
  try {
    const data= await attendenceModel.find({}).populate("student",('-password'));
    return res.status(200).json({
      success:true,
      data,
      message:"Successfully fetched all Attendence sheets"
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
  })
  }
}
const userAttendanceController  = async(req,res)=>{
      const student= req.params.student
      const data= await attendenceModel.find({student}).populate("student",('-password'))
      return res.status(200).json({
        success:true,
        data
      })
}
const gradeController= async (req, res) => {
  try {
    const student = req.params.student;
   
    const totalDays = await attendenceModel.countDocuments({ student });
    const daysPresent = await attendenceModel.countDocuments({ student, status: 'Present' });
    const attendancePercentage = (daysPresent / totalDays) * 100;
    
    res.json({ attendancePercentage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export {updateAttendenceController,allAttendenceSheet,takeAttendeceController,deleteAttendenceController,userAttendanceController,gradeController}
