import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img from '../assets/signin.gif'
import axios from 'axios'
const Register = () => {
  const [loading,setLoading]=useState(false)
  const navigate= useNavigate()
  const [data,setData] = useState({
    username : "",
    photo:"",
    email:'',
    password:''
  })
  const [selectedImage,setSelectedImage]= useState(null)
const handleUploadPic =async(e)=>{
 
  const image = e.target.files[0];
  const formData = new FormData();
    formData.append('image', image);
    data.photo= image.name;
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(image);
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
     
    } catch (error) {
      console.error(error);
    }
}
const handleChange= (e)=>{
  setData({...data,[e.target.name]:e.target.value})
}
const handleSubmit= async(e)=>{
  e.preventDefault();
  try {
    setLoading(true)
    const res= await axios.post(`${import.meta.env.VITE_URL}/api/v1/register`,{
      username:data.username,
      email:data.email,
      photo:data.photo,
      password:data.password
    })
    setLoading(false)
    navigate('/login')
  } catch (error) {
    setLoading(false)
  }
}

  return (
    <div className='  bg-[#486235] h-[88vh]  text-white pt-20'>
    <div className=' flex items-center justify-center  flex-col'>
   <h1 className=' text-2xl font-serif mb-3'>Register a new account</h1>
       <form onSubmit={handleSubmit}  className='flex flex-col  w-[25vw] ' >
       <div className=' relative'> <img src={selectedImage? selectedImage :img} className=' w-24 h-24 mx-auto rounded-full ' alt="photo" />
        <label>
                            <div className=' text-[15px]   pb-1 pt-2 cursor-pointer text-center  w-full'>
                              Upload  Photo
                            </div>
                            <input required type='file' className='hidden' onChange={handleUploadPic}/>
                          </label></div>
       <label htmlFor="username">Username:</label>
       <input required onChange={handleChange}  name='username' className=' text-black outline-none rounded-sm py-0.5 mb-2' type="text" />
         <label htmlFor="email">Email:</label>
         <input required onChange={handleChange} name='email' className=' text-black outline-none rounded-sm py-0.5 mb-2' type="email" />
         <label htmlFor="password">Password:</label>
         <input required onChange={handleChange} name='password' className=' text-black outline-none rounded-sm py-0.5' type="password" />
         <button disabled={loading} className=' bg-green-500 w-24 mx-auto py-1 px-2 rounded-md mt-3 mb-0.5'  type='submit'>Register</button>
       </form>
       <h1>Already have a acoount? <Link className=' font-bold text-green-600' to={'/login'}>Login</Link></h1>
    </div>
 </div>
  )
}

export default Register
