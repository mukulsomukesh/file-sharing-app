import * as types from "./actionTypes";

const initialState = {
  isLogin: false,
  isProcessing: false,
  loginMessage: "",

  isSignup: false,
  signupMessage: "",
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.USER_LOGIN_PROCESS:
      return {
        ...state,
        isProcessing: true,
        loginMessage: "",
        signupMessage: "",
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        isProcessing: false,
        loginMessage: "",
        signupMessage: "",
      };
    case types.USER_LOGIN_FAILURE:
      return {
        ...state,
        isLogin: false,
        isProcessing: false,
        loginMessage: payload,
      };
    case types.USER_SIGNUP_PROCESS:
      return {
        ...state,
        isSignup: false,
        isProcessing: true,
        signupMessage: "",
        loginMessage:""
      };
    case types.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isSignup: true,
        isProcessing: false,
        signupMessage: "",
        loginMessage:""
      };
    case types.USER_SIGNUP_FAILURE:
      return {
        ...state,
        isSignup: false,
        isProcessing: false,
        signupMessage: payload,
      };
    default:
      return state;
  }
};
