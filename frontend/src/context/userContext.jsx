import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
const AuthContext = createContext();
const AuthProvider= ({children})=>{
  const [auth,setAuth]= useState({
    user:null
  })
  useEffect(()=>{
   const fetchUser= async()=>{
      const {data}= await axios.get(`${import.meta.env.VITE_URL}/api/v1/refetch`,{withCredentials:true})
      setAuth({...auth , user:data.user})
        }
      fetchUser();
  },[])
   return (
    <AuthContext.Provider value={{auth,setAuth}}>
{children}
    </AuthContext.Provider>
  )
}
const useAuth= ()=> useContext(AuthContext)
export {useAuth,AuthProvider}