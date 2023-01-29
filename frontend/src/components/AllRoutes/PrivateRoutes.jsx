import React from 'react'
import { BsTypeUnderline } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({children}) {

    // const isLogin = useSelector((store) => store.AuthReducer.isLogin)
    const isLogin = false

    
    if(!isLogin){
    return <Navigate to="/authentication"> </Navigate>
    }
    else{
        return children
    }


}