import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({children}) {

    const isLogin = useSelector((store) => store.AuthReducer.isLogin)

    
    if(!isLogin){
 
        // store requested page url in local storage
        localStorage.setItem("file-sharing-app-redirect-url", window.location.pathname);
 
        return <Navigate to="/authentication"> </Navigate>
    }
    else{
        return children
    }


}