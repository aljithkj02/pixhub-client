import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRouter = ( {children}) => {
  let user = true;
  if(user) return children;
  return <Navigate to="/login" />;
}

export default PrivateRouter
