import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/userContext'
import toast from 'react-hot-toast';
const Login = () => {
  const [loading,setLoading]=useState(false)
  const {auth,setAuth}= useAuth()

  const navigate = useNavigate();
  const [value,setValue]= useState({
    email:'',
    password:''
  })
  const handleChange =(e)=>{
    setValue({...value, [e.target.name]:e.target.value} )
  }
 
  const handleSubmit =async(e)=>{
    e.preventDefault();

    try {
      setLoading(true)
      const res= await axios.post(`${import.meta.env.VITE_URL}/api/v1/login`, {
        email:value.email,
        password:value.password
      },{withCredentials:true})
      setLoading(false)
      
    toast.success("Login Successfully")
      setAuth({...auth, user:res?.data})
      await  res?.data?.role===0 ?navigate('/dashboard'):navigate('/admin/dashboard')
      
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false)
    }
  }
  return (
    <div className='  bg-[#486235] h-[88vh]  text-white pt-20'>
       <div className=' flex items-center justify-center  flex-col'>
      <h1 className=' text-2xl font-serif mb-3'>Login to your account</h1>
          <form  onSubmit={handleSubmit} className='flex flex-col  w-[25vw] ' >
            <label htmlFor="email">Email:</label>
            <input required name='email' onChange={handleChange} className=' text-black outline-none rounded-sm py-0.5 mb-2' type="email" />
            <label htmlFor="password">Password:</label>
            <input required name='password' onChange={handleChange} className=' text-black outline-none rounded-sm py-0.5' type="password" />
            <button disabled={loading} className=' bg-green-500 w-24 mx-auto py-1 px-2 rounded-md mt-3 mb-0.5' type='submit'>Login</button>
          </form>
          <h1>Don't have an acoount? <Link className='   text-green-500 font-bold' to={'/register'}>Register</Link></h1>
       </div>
    </div>
  )
}

export default Login
