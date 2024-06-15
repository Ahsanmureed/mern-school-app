import React from 'react'


import Loader from '../components/Loader'
import { useAuth } from '../context/userContext';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({children,accessBy}) => {
  const {auth}= useAuth();
  if(accessBy ==="Auth"){
    return auth?.user ? children:<Navigate to={'/login'}/>
  }
 else if(accessBy ==="non-Auth"){
  return !auth?.user ? children:<Navigate to={'/dashboard'}/>
 }
 
}


export default PrivateRoutes
