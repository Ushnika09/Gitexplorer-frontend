import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectRoutes() {
    const token=localStorage.getItem("jwt")

    if(!token) {
        return <Navigate to={"/login"} replace/>
    }
    
  return <Outlet/>

}

export default ProtectRoutes