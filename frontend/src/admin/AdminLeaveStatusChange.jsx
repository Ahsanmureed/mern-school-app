import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import moment from 'moment';
import AdminRoleLeaves from './AdminRoleLeaves'
import axios from 'axios';
const AdminLeaveStatusChange = ({onclose,leave,fetch}) => {
  const [loading,setLoading]=useState(false)
  const [leaveStatus,setLeaveStatus] = useState({status:leave.status})
  const handleOnChangeSelect = (e) => {
    setLeaveStatus({...leaveStatus,status:e.target.value})

    
}
const updateAttendance =async ()=>{
 try {
  setLoading(true)
  const { data } = await axios.put(`${import.meta.env.VITE_URL}/api/v1/leave/${leave._id}`,{status:leaveStatus?.status})
  setLoading(false)
  onclose();
  fetch()
  
 } catch (error) {
  console.log(error);
  setLoading(false)
 }
  
}
  return (
    <div className=' fixed bg-slate-200 bg-opacity-100 left-72 top-[4.4rem] right-0  w-[60vw] overflow-y-scroll   z-20 mt-3 h-[80vh]'>
    <RxCross1 onClick={onclose} className=' absolute right-3 top-3 text-[21px] cursor-pointer'/>
    <div className=' mt-3 ml-3 flex flex-col gap-1'> <h1><strong>Student Name:</strong> {leave?.student?.username}</h1>
    <h1><strong>Reason:</strong> {leave?.reason?.length >22 ? leave?.reason?.substring(0,450) + '....':leave?.reason}</h1>
    <h1><strong>Date: </strong>{moment(leave?.createdAt).format('LL')}</h1>
    <h1 className='pb-4 text-lg  mt-1.5 text-center font-bold'>Change Leave Status</h1>

 


<div className='flex items-center  justify-center  my-4'>
   <p className=' mr-1.5'><strong>Status:</strong></p>  
   <select className='border px-4 py-1' value={leaveStatus?.status} onChange={handleOnChangeSelect}>
       {
           Object.values(AdminRoleLeaves).map(el => {
               return(
                   <option value={el} key={el}>{el}</option>
               )
           })
       }
   </select>
</div>
<button disabled={loading} className='w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateAttendance}>Change Status</button>
    </div>

  </div>
  )
}

export default AdminLeaveStatusChange
