import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({children}) {

    const isLogin = useSelector((store) => store.AuthReducer.isLogin)

    
    if(!isLogin){
    return <Navigate to="/authentication"> </Navigate>
    }
    else{
        return children
    }


}