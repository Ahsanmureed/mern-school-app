import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/userContext';

const ProfileMenu = ({onClose}) => {
  const{auth,setAuth}= useAuth()
  const handleLogout =async()=>{
    await axios.post(`${import.meta.env.VITE_URL}/api/v1/logout`,{},{withCredentials:true});
    setAuth({...auth,user:null})
  }
  return (
    <div className=' absolute bg-[#486235]  w-44 h-44 right-3 top-14 z-40  '>
       <div className=' flex text-white text-center flex-col py-12 gap-5'>
       <Link to={'/login'} onClick={()=> {handleLogout();onClose()}} className=' text-[19px] *:'>Logout</Link>
       <Link to={'/dashboard'}  onClick={onClose} className=' text-[19px]'>Dashboard</Link>
       </div>
      
    </div>
  )
}

export default ProfileMenu
