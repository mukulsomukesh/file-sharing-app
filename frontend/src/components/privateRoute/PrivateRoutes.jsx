import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { checkAuthentication } from '../../redux/AuthReducer/action';

export default function PrivateRoute({ children }) {

    const dispatch = useDispatch();
    const isLogin = useSelector((store) => store.AuthReducer.isLogin)

    // check if user login
    useEffect(() => {
        dispatch(checkAuthentication)
    }, [])


    //   if not login redirect to login
    if (!isLogin) {

        // store requested page url in local storage
        localStorage.setItem("file-sharing-app-redirect-url", window.location.pathname);

        // redirect to login
        return <Navigate to="/login"> </Navigate>
    }
    else {
        return children
    }


}