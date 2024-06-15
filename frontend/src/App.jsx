import React from 'react'
import { Route,Routes  } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Dashboard from './user/Dashboard'
import Leaves from './user/Leaves'
import PrivateRoutes from './routes/PrivateRoutes'
import { useAuth } from './context/userContext'
import Attendance from './user/Attendance'
import AdminDashboard from './admin/AdminDashboard'
import AdminLeaves from './admin/AdminLeaves'
import AdminAttendance from './admin/AdminAttendance'

const App = () => {
  const {auth}= useAuth()
  return (
   <>
   <NavBar/>
   <Routes>
   <Route path='/register' element={!auth?.user?<Register/>:<Dashboard/>}/>
   <Route path='/login' element={!auth?.user?<Login/>:<Dashboard/>}/>
   <Route path='/' element={<Home/>}/>
  <Route path='/dashboard' element={auth?.user ?<Dashboard/>:<Login/>}/>
  <Route path='/attendance' element={!auth?.user?<Login/>:<Attendance/>}/>
   <Route path='/leaves' element={!auth?.user?<Login/>:<Leaves/>}/>
   <Route path='/admin/dashboard' element={!auth?.user ||auth?.user?.role===0?<Login/>:<AdminDashboard/>}/>
   <Route path='/admin/leaves' element={!auth?.user ||auth?.user?.role===0?<Login/>:<AdminLeaves/>} />
   <Route path='/admin/attendance' element={!auth?.user ||auth?.user?.role===0?<Login/>:<AdminAttendance/>}/>
   </Routes>
   </>
  )
}

export default App
