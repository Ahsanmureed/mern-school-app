import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { useAuth } from '../context/userContext';
import axios from 'axios';
import moment from 'moment'
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import CreateLeave from './CreateLeave';
import Loader from '../components/Loader';
import EditLeave from './EditLeave';
const Leaves = () => {
  const [editRequestId, setEditRequestId] = useState(null);
  const [editOpen,setEditOpen]= useState(false)
  const {auth} = useAuth();
  const [loading,setLoading]= useState(false)
 const [isOpen,setIsOpen]= useState(false)
  const [leaveRequests,setLeaveRequests] = useState([])
  const fetchLeaveRequests = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${import.meta.env.VITE_URL}/api/v1/leave/user-leaves/${auth?.user?._id}`);
      setLeaveRequests(response.data.userLeaves);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };
  useEffect(() => {

    fetchLeaveRequests();
  }, [auth]);
  
  const handleDelete =async(id)=>{
      await axios.delete(`${import.meta.env.VITE_URL}/api/v1/leave/${id}`)
      fetchLeaveRequests();
  }
  const handleEdit =(id)=>{
    setEditRequestId(id)
  }
  
  return (
    <div>
      <SideBar/>
      {
        loading ? <><Loader/></>:<><div>
        <button onClick={()=> setIsOpen(true)} className=' absolute text-white right-2  mt-3 px-3 py-1 rounded-md  bg-[#486235] font-medium'>Add leave Request</button>
        {
          isOpen ? <CreateLeave fetchPost={fetchLeaveRequests} onClose={()=> setIsOpen(false)}/>:''
        }
        <div className=' mx-60'>
        
        <div className=''>
          {
            leaveRequests.length>0 ?<div><h2 className=' pt-12 text-2xl font-semibold ml-24 text-center mb-4'>Leave Requests</h2>
            <table className=' w-[74vw]    '>
  
            <thead>
              <tr className='   bg-[#486235] text-white'>
                <th>Reason</th>
                <th>Status</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
          
      <tbody >
      {leaveRequests?.map((request) => (
  <tr className='text-center border-2'>
    <td>{request.reason.length > 27 ? request.reason.substring(0,15) + '....' : request.reason}</td>
    <td className='bg-[#486235] w-12 mx-auto px-2 text-white rounded-md font-bold'>{request.status}</td>
    <td>{moment(request?.createdAt).format('LL')}</td>
    <td>
      <MdModeEdit  onClick={() => { handleEdit(request); setEditOpen(true) }} className='cursor-pointer text-[#486235] text-[21px] mx-auto' />
    </td>
    <td>
      <MdDelete onClick={() => handleDelete(request?._id)} className='text-[#486235] text-[21px] mx-auto cursor-pointer' />
    </td>
  </tr>
))}
{editOpen ? <EditLeave request={editRequestId} onClose={() => setEditOpen(false)} fetchPost={fetchLeaveRequests} /> : null}
      </tbody>
      </table></div>:<h1 className=' text-3xl font-bold text-center ml-24 pt-14'>No Leave Found</h1>
          }
        </div>
      </div>
        </div></>
      }
    </div>
  )
}

export default Leaves
