import * as types from "./actionTypes";

const initialState = {
    isLogin:false,
    isLoginProcessing:false,
    loginMessage:"",

    isSignup:false,
    isSignupProcessing:false,
    signupMessage:"",
}



export const reducer = (state = initialState, action) => {
    
    const { type, payload } = action;

    switch (type) {
        case types.USER_LOGIN_PROCESS:
        return{
            ...state,
            isLoginProcessing:true,
            loginMessage:"",        
            signupMessage:"",        
        }
        case types.USER_LOGIN_SUCCESS:
        return{
            ...state,
            isLogin:true,
            isLoginProcessing:false,
            loginMessage:"", 
            signupMessage:"",
        
        }
        case types.USER_LOGIN_FAILURE:
        return{
            ...state,
            isLogin:false,
            isLoginProcessing:false,
            loginMessage:payload,        
        }
        case types.USER_SIGNUP_PROCESS:
        return{
            ...state,
            isSignup:false,
            isSignupProcessing:true,
            signupMessage:"",
        
        }
        case types.USER_SIGNUP_SUCCESS:
        return{
            ...state,
            isSignup:true,
            isSignupProcessing:false,
            signupMessage:"",
        
        }
        case types.USER_SIGNUP_FAILURE:
        return{
            ...state,        
            isSignup:false,
            isSignupProcessing:false,
            signupMessage:payload,
        
        }
        default:
            return state
    
    }
    
}
