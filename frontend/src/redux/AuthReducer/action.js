import axios from "axios";
import * as types from "./actionTypes";

// signup function
const signUp = (name, email, password) => (dispatch) => {
  dispatch({ type: types.USER_SIGNUP_PROCESS });
  axios
    .post("http://localhost:5000/user", {

      name,
      email,
      password,
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: types.USER_SIGNUP_SUCCESS });
      
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: types.USER_SIGNUP_FAILURE, payload:"Somthing Went Wront" });
    });
};

// login function
const login =  (email, password) => (dispatch) => {
  dispatch({ type: types.USER_LOGIN_PROCESS });
  axios
    .post("http://localhost:5000/user/login", {

      email,
      password,
    })
    .then((res) => {
      console.log(res)
      dispatch({ type: types.USER_LOGIN_SUCCESS, payload: res });
      localStorage.setItem("jwt", res.data.token)
    })
    .catch((err) => {
      dispatch({
        type: types.USER_LOGIN_FAILURE,
        payload: "Somthing Went Wrong",
      });
    });
};

export { signUp, login };
