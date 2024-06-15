import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import ROLE from './ROLE'
import axios from 'axios';
const AttendanceRole = ({onClose,record,fetch,percentage}) => {
  
  const [attendance,setAttendance]= useState({
    status:record?.status
  })
  const [studentAttendance,setStudentAttendance] = useState(attendance?.status)
    const handleOnChangeSelect = (e) => {
      setAttendance({...attendance,status:e.target.value})

      
  }
  
  const updateAttendance =async ()=>{
    const { data } = await axios.put(`${import.meta.env.VITE_URL}/api/v1/attendance/${record._id}`,{status:attendance?.status})
    onClose();
    fetch()
    percentage()
    
  }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
    <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

         <button className='block ml-auto' onClick={onClose}>
             <IoMdClose/>
         </button>

         <h1 className='pb-4 text-lg font-medium'>Submit Attendance:</h1>

          <p>Status : {record.status}</p>   
          

         <div className='flex items-center justify-between my-4'>
             <p>Status :</p>  
             <select className='border px-4 py-1' value={attendance?.status} onChange={handleOnChangeSelect}>
                 {
                     Object.values(ROLE).map(el => {
                         return(
                             <option value={el} key={el}>{el}</option>
                         )
                     })
                 }
             </select>
         </div>


         <button className='w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateAttendance}>Submit</button>
    </div>
 </div>
  )
}

export default AttendanceRole
