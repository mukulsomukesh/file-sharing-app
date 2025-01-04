import axios from "axios";
import * as types from "./actionTypes";

const END_POINT = process.env.REACT_APP_BACKEND_URL


// signup function
const signUp = (name, email, password)  => async (dispatch) => {
  dispatch({ type: types.USER_SIGNUP_PROCESS });


  try {
    const res = await axios.post(`${END_POINT}/user`, {
      name,
      email,
      password
    });
    
    if(res.data.msg === "User already exists!"){
      dispatch({ type: types.USER_SIGNUP_FAILURE, payload:"User Already Exist!" });
    }
    else{
      dispatch({ type: types.USER_SIGNUP_SUCCESS });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: types.USER_SIGNUP_FAILURE, payload:"Somthing Went Wrong!" });
  }
};

// login function
const login =  (email, password)  => async (dispatch) => {
  dispatch({ type: types.USER_LOGIN_PROCESS });
  
  try {
    const res = await axios.post(`${END_POINT}/user/login`, {
      email,
      password
    });
    
    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: res });
    localStorage.setItem("file-sharing-application-jwt", res.data.token)
    localStorage.setItem("file-sharing-application-user-name", res.data.user.name)

  } catch (err) {
    console.error(err.response.data.error);
    dispatch({
      type: types.USER_LOGIN_FAILURE,
      payload: err.response.data.error,
    });
  }
};

// forgotPassword function
const forgotPassword =  (email)  => async (dispatch) => {
  dispatch({ type: types.USER_FORGOT_PASSWORD_PROCESS });
  
  try {
    const res = await axios.post(`${END_POINT}/user/forgot-password`, {
      email    });
    console.log("res ", res)
    dispatch({ type: types.USER_FORGOT_PASSWORD_SUCCESS, payload: res?.message || "Forgot password link sent to your email" });

  } catch (err) {
console.log("err?.response?.data?.message", err?.response?.data?.message)
    dispatch({
      type: types.USER_FORGOT_PASSWORD_FAILURE,
      payload: err?.response?.data?.message || "Forgot password failed",
    });
  }
};

// check if user already login
const checkAuthentication =  async (dispatch) => {
  const token = localStorage.getItem("file-sharing-application-jwt")
  if(token){
    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: "" });
  }
}

export { signUp, login, checkAuthentication, forgotPassword };
