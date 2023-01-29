import axios from "axios"
import * as types from "./actionTypes";

const signUp = (name, email, password) => (dispatch) => {
dispatch({type:types.USER_SIGNUP_PROCESS})
    axios.post("https://vast-erin-earthworm.cyclic.app/user/login", {name, email, password})
    .then((res) => {
        console.log(res)
        dispatch({type:types.USER_SIGNUP_SUCCESS})
    })
    .catch((err) => {
        console.log(err)
        dispatch({type:types.USER_SIGNUP_FAILURE})
    })
}


const login = (email, password) => (dispatch) => {
    dispatch({ type: types.USER_LOGIN_PROCESS });

    // post request
    axios
      .post("https://vast-erin-earthworm.cyclic.app/user/login", { email, password })
      .then((res) => {
        dispatch({ type: types.USER_LOGIN_SUCCESS, payload: res });
      })
      .catch((err) => {
        dispatch({ type: types.USER_LOGIN_FAILURE, payload: "Somthing Went Wrong" });
      });

}

export {signUp, login}