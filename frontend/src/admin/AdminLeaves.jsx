import React, { useEffect, useState } from 'react'
import AdminSideBar from './AdminSideBar'
import axios from 'axios'
import Loader from '../components/Loader'
import moment from 'moment'
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AdminLeaveViewer from './AdminLeaveViewer';
import AdminLeaveStatusChange from './AdminLeaveStatusChange';
const AdminLeaves = () => {
  const [editLeave,setEditLeave]= useState(null)
  const [loading,setLoading]=useState(false)
  const [editOpen,setEditOpen]= useState(false)
  const [viewLeave,setViewLeave]= useState(null)
  const [leaves,setLeaves]= useState([])
  const [view,setView]= useState(false)
  const fetchLeaves= async()=>{
    try {
      setLoading(true)
      const {data} = await axios.get(`${import.meta.env.VITE_URL}/api/v1/leave/all-leaves`)
      setLoading(false)
    setLeaves(data.allLeaves);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchLeaves();
  },[])
  const handleDelete= async(id)=>{
    try {
      setLoading(true)
      const {data}=await axios.delete(`${import.meta.env.VITE_URL}/api/v1/leave/${id}`)
      fetchLeaves()
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
 
  
  return (
    <div>
      <AdminSideBar/>
      {
        loading ? <Loader/>:<><div className=' mx-60 mt-2'>
        {
          leaves.length>0 ?<table className=' w-[74vw] border-2    '>
    
          <thead>
            <tr className='   bg-[#486235] text-white'>
              <th>From</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Date</th>
              <th>View</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              leaves.map((leave)=> (
                
                <tr className=' text-center border-2'>
                 <td> {leave?.student?.username}</td>
                 <td>{leave.reason.length >22 ? leave?.reason.substring(0,15) + '....':leave?.reason}</td>
                 <td className='bg-[#486235] w-20 text-white rounded-md '>{leave?.status}</td>
                 <td>{moment(leave?.createdAt).format('LL')}</td>
                 <td><FaEye onClick={(()=>{ setView(true); setViewLeave(leave)})} className=' cursor-pointer mx-auto text-[20px]'/></td>
                 <td><MdEdit onClick={()=> { setEditOpen(true); setEditLeave(leave)}} className=' cursor-pointer mx-auto text-[20px]'/></td>
                 <td><MdDelete onClick={()=>handleDelete(leave._id)} className=' cursor-pointer mx-auto text-[20px]'/></td>
                </tr>)
              )
            }
            {
         view ? <AdminLeaveViewer leave= {viewLeave} onclose={()=> setView(false)}/>:''
            }
            {
              editOpen ? <AdminLeaveStatusChange fetch={fetchLeaves} leave={editLeave} onclose={()=> setEditOpen(false)}/> : ""
            }
          </tbody>
          </table>:<h1 className=' text-center ml-20 text-2xl font-semibold mt-3'>No Leaves Found</h1>
        }
        </div></>
      }
    </div>
  )
}

export default AdminLeaves
