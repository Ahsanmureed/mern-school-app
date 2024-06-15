import React, { useEffect, useState } from 'react'
import AdminSideBar from './AdminSideBar'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
const AdminDashboard = () => {
  const [students,setStudents]= useState([])
  const [del,setDel]= useState(null)

  const fetchUsers= async()=>{
    const {data}= await axios.get(`${import.meta.env.VITE_URL}/api/v1/all-students`)
    setStudents(data.students);
  }
  useEffect(()=>{
fetchUsers()
  },[])
  const handleDelete= async(id)=>{
    try {
      const {data}=await axios.delete(`${import.meta.env.VITE_URL}/api/v1/${id}`)
      fetchUsers()
    } catch (error) {
      
    }
  }
  console.log(students);
  return (
    <div>
      <AdminSideBar/>
      <div className=' mx-60 mt-2'>
      <table className=' w-[74vw] border-2    '>
  
  <thead>
    <tr className='   bg-[#486235] text-white'>
      <th>Username</th>
      <th>Email</th>
     <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {
      students?.map((student)=> (
        
        <tr className=' text-center border-2'>
     <td>{student?.username}</td>
     <td>{student?.email}</td>
     <td><MdDelete onClick={()=>handleDelete(student._id)} className=' cursor-pointer mx-auto text-[20px]'/></td>
        </tr>)
      )
    }
   
  </tbody>
  </table>
      </div>
    </div>
  )
}

export default AdminDashboard
