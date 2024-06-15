import React, { useContext, useState } from 'react'
import img from '../assets/logo.png'
import {Link} from "react-router-dom"
import {  useAuth } from '../context/userContext'
import axios from 'axios'
import ProfileMenu from './ProfileMenu'
import  { Toaster } from 'react-hot-toast';
const NavBar = () => {
  const{auth,setAuth}= useAuth()
  const [open,setOpen] =useState(false)
  

  return (
    <nav className=' flex  fixed top-0  text-white  items-center justify-between w-screen px-6 border-b-2 border-b-[#87A273]  bg-[#486235] z-10    py-1.5'>
<Toaster />
      <Link  className=' flex items-center  gap-2 ' to={'/'}><img src={img} alt="" />Lincoln High School</Link>
      <div className=' flex items-center gap-8'>
      {auth?.user? 
     <img className=' w-10 cursor-pointer rounded-full' onClick={()=> setOpen(!open)}  src={`${import.meta.env.VITE_URL}/download/${auth?.user?.photo}`} alt='hello'/>:<> <Link to={'/login'} className=' text-[21px] '>Login</Link>
      <Link to={'/register'} className=' text-[21px]'>Register</Link></>}
      </div>
      {
        open ? <ProfileMenu onClose={()=>setOpen(!open)} />:
        ''
      }
    </nav>
  )
}

export default NavBar
