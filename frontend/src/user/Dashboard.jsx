import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/userContext'
const Dashboard = () => {
  const {auth,setAuth}= useAuth()
  
const [loading,setLoading]=useState(false)
 const [username,setUsername]=useState('')
 const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photo,setPhoto]=useState('')

  useEffect(()=>{
const username= auth?.user?.username
const email= auth?.user?.email
const photo= auth?.user?.photo
setPhoto(photo)
setUsername(username)
setEmail(email)

  },[auth?.user])
  
  const [selectedImage,setSelectedImage]= useState(null)
  const handleImage =async(e)=>{
    const image = e.target.files[0];
    const formData = new FormData();
      formData.append('image', image);
      
      setPhoto(image.name);
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
  const handleSubmit = async(e)=>{
e.preventDefault();
try {
  setLoading(true)
  const {data}= await axios.put(`${import.meta.env.VITE_URL}/api/v1/${auth?.user?._id}`,{
    username,
    email,
    photo:photo
  },{withCredentials:true})
  
  setAuth({...auth,user:data})
  setLoading(false)
  toast.success("Successfully Updated Profile")
} catch (error) {
  setLoading(false)
}
  }
  return (
    <div className=' '>
      <SideBar/>
      <div className=' mx-60 flex items-center justify-center pl-40 mt-4'>
  <form onSubmit={handleSubmit}  className=' flex flex-col w-[52%]' >
  <div className=' flex mx-auto flex-col text-center'>
    <img src={selectedImage ? selectedImage : `${import.meta.env.VITE_URL}/download/${auth?.user?.photo}`} className='  ml-2 w-20 h-20 rounded-full' alt="hello" />
  <label className=' cursor-pointer font-medium' >
  
 <h1 className=' text-center'> Change Photo</h1>
    <input onChange={handleImage} filename={auth?.user?.photo} type="file" name="" className=' hidden' id="" />
  </label>
  </div>

    <label className=' font-medium' htmlFor="username">UserName:</label>
    <input required className=' border-2 rounded-md outline-none mt-0.5 mb-2' value={username} onChange={(e)=> setUsername(e.target.value)}  type="text" />
    <label htmlFor="email">Email:</label>
    <input required className=' border-2 rounded-md outline-none mt-0.5 mb-2' type="text" onChange={(e)=> setEmail(e.target.value)} value={email} />
   
    <button disabled={loading}  className=' bg-green-400 w-24 mx-auto py-1 px-2 rounded-md mt-3 mb-0.5' type='submit'>Update</button>
  </form>

      </div>
    </div>
  )
}

export default Dashboard
