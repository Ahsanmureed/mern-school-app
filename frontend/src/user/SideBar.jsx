import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className="h-screen  bg-[#486235] w-48 fixed top-[4.36rem] pb-20 left-0 text-white flex flex-col justify-center items-center">
      
      <div className="text-xl text-center flex flex-col ">
        <Link to={'/dashboard'} className="py-2 ">Dashboard</Link>
        <Link to={'/attendance'} className="py-2 ">Attendance</Link>
        <Link 
        to={'/leaves'} className="py-2 ">Leave Requests</Link>
        
      </div>
    </div>
  )
}

export default SideBar
