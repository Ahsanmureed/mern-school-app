import axios from 'axios';
import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { useAuth } from '../context/userContext';

const CreateLeave = ({onClose,fetchPost}) => {
  const {auth}= useAuth()
  const [values,setValues]= useState({
    reason:""
  })
  const handleChange = (e)=>{
  setValues({...values,[e.target.name]:e.target.value})
  }
  console.log(values);
  const handleSubmit =async(e)=>{
    e.preventDefault();
    try {
      const {data}= await axios.post(`${import.meta.env.VITE_URL}/api/v1/leave/create`,{
        student:auth?.user?._id,
        reason:values.reason
      })
      onClose();
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className=' fixed bg-slate-200 bg-opacity-100 left-72 right-0  w-[60vw]   z-20 mt-6 h-[80vh] '>
     <RxCross1 className=' cursor-pointer text-[21px] absolute right-3 top-4 hover:text-[#486235]' onClick={onClose}/>


<div className=' flex items-center justify-center mt-12 flex-col'><h1 className='text-[21px] font-semibold mb-4'>Add new leave</h1>
     <form onSubmit={handleSubmit} className=' flex-col flex w-[50%]' > 
<label className=' font-medium text-[18px]' htmlFor="reason">
 Reason:
  
</label>
<textarea onChange={handleChange}  className=' outline-none' name="reason" id="" cols="30" rows="10"></textarea>
<button className=' bg-[#486235] w-28  hover:bg-[#61973b] mx-auto px-2 py-1 mt-3 rounded-md text-white'  type="submit">
  Submit
</button>
     </form></div>
    </div>
  )
}

export default CreateLeave
