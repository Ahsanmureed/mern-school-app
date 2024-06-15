import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import axios from 'axios'
import {useAuth} from '../context/userContext'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import AttendanceRole from './AttendanceRole'
import Loader from '../components/Loader'
const Attendance = () => {
  const [grade,setGrade]= useState(null)
  const [attendanceStatus,setAttendanceStatus]= useState(null)
  const [editOpen,setEditOpen]= useState(false)
  const {auth}= useAuth()
  const [attendance,setAttendance]= useState([])
  const [loading, setLoading] = useState(false);
  const fetchAttendance = async()=>{
    
    try {
      setLoading(true)
      const {data}= await axios.get(`${import.meta.env.VITE_URL}/api/v1/attendance/user-attendance/${auth?.user?._id}`)
      setLoading(false)
    setAttendance(data.data);

    } catch (error) {
      setLoading(false)
    }
  }
  const fetchGrade=async()=> {
    const {data}= await axios.get(`${import.meta.env.VITE_URL}/api/v1/attendance/${auth?.user?._id}`)
    setGrade(data.attendancePercentage)
  }
  useEffect(()=>{
    fetchAttendance(),
    fetchGrade()
  },[])
  
  const handleStatus =(attendance)=>{
    setAttendanceStatus(attendance)
  }
const gradeCalculator = (percentage)=>{
  if (percentage >= 90) {
    return 'A';
  } else if (percentage >= 80) {
    return 'B';
  } else if (percentage >= 70) {
    return 'C';
  } else if (percentage >= 60) {
    return 'D';
  }
  else if (percentage>=40){
    return "E";
  }
  else {
    return 'F';
  }
}
const gradeCal = gradeCalculator(grade)

  return (
    <div>
      <SideBar/>

<div className=' mx-60'>
  
{
        loading   ? <><Loader/></>:<><div>
        

        {
          attendance.length>0?<><h3 className=' text-[21px] text-center ml-40 mb-2 mt-2 font-semibold'>Attendance Records</h3>
           <h1 className=' text-center mb-1 ml-16'><strong>Your Attendance Percentage:</strong> {grade}% <strong className='  ml-28'>Grade:</strong>  {gradeCal}</h1>
          <table className=' w-[74vw] '>
           
            
          <thead>
            <tr className='bg-[#486235] text-white'>
              <th>Date</th>
              <th>Status</th>
              <th>Mark</th>
            </tr>
          </thead>
          <tbody>
            {attendance?.map(record => (
              <tr className=' border-2  text-center ' key={record._id}>
                <td>{moment(record?.date).format('LL')}</td>
                <td className='bg-[#486235] text-white w-20 font-bold rounded-sm '>{record?.status}</td>
               <td><MdModeEdit  onClick={()=>{ setEditOpen(true); handleStatus(record)}} className={` text-[#486235] text-[21px] mx-auto cursor-pointer ${moment(record?.date).format("LL") ===moment(Date.now()).format("LL")? '':'hidden'}  `}/></td>
              </tr>
            ))}
          </tbody>
        </table></>:<><h1 className=' text-3xl font-bold text-center ml-24 pt-14'>No Record Found</h1></>
        }
      </div></>
      }
</div>
      {
  editOpen ? <AttendanceRole  percentage={fetchGrade}  fetch={fetchAttendance} record={attendanceStatus} onClose ={()=> setEditOpen(false)}/>:''
}
    </div>
  )
}

export default Attendance
