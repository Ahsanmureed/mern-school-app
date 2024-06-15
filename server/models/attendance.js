import mongoose from "mongoose";
const attendenceSchema= new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', 
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    
  },
  
  status: {
    type: String,
    default:"Absent",
    enum:["Present","Absent"]
  }
})
const attendenceModel = mongoose.model("Attendences",attendenceSchema)
export  {attendenceModel};