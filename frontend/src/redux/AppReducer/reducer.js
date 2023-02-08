import * as types from "./actionTypes";

const initialState = {
  isLoading: false,
  allFiles: [],
  
  isUploading:false,
  
  isError: false,
  message: "",
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.ALL_FILES_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };
    case types.ALL_FILES_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allFiles: payload,
        message: "",
      };
    case types.ALL_FILES_LOADING_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        allFiles: [],
        message: "",
      };
    case types.UPLOAD_FILE_PROCESS:
      return {
        ...state,
        isUploading:true,
        isError: false,
        message: "",
      };
    case types.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        isUploading:false,
        isError: false,
        message: "File Upload Success!",
      };
    case types.UPLOAD_FILE_FAILURE:
      return {
        ...state,
        isUploading:false,
        isError: true,
        message: "File Upload Fail. Please Try Again!",
      };

    default:
      return state;
  }
};
