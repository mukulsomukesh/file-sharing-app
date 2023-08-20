import * as types from "./actionTypes";

const initialState = {
  isLoading: false,
  allFiles: [],

  isUploading: false,
  uploadedFileId: "",

  isError: false,
  message: "",

  singleFile: {},

  downloadFileProcessign: false,
  downloadFileSuccess: false,
  downloadFileFail: false,
  downloadFileMessage: "",
  downloadFileData: "",
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SINGLE_FILE_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case types.SINGLE_FILE_LOADING_SUCCESS:
      return {
        ...state,
        isError: false,
        isLoading: false,
        singleFile: payload
      };
    case types.SINGLE_FILE_LOADING_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
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
        isUploading: true,
        isError: false,
        message: "",
      };
    case types.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        isUploading: false,
        isError: false,
        message: "File Upload Success!",
        uploadedFileId: payload
      };
    case types.UPLOAD_FILE_FAILURE:
      return {
        ...state,
        isUploading: false,
        isError: true,
        message: "File Upload Fail. Please Try Again!",
      };
    case types.DELETE_FILE_PROCESS:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };
    case types.DELETE_FILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: payload,
      };
    case types.DELETE_FILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: payload,
      };
    case types.MODIFY_FILE_NAME_PROCESS:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };
    case types.MODIFY_FILE_NAME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: payload,
      };
    case types.MODIFY_FILE_NAME_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: payload,
      };
    case types.DOWNLOAD_FILE_PROCESS:
      return {
        ...state,
        downloadFileProcessign: true,
        downloadFileSuccess: false,
        downloadFileFail: false,
        downloadFileMessage: "",
        downloadFileData: "",
      };
    case types.DOWNLOAD_FILE_SUCCESS:
      return {
        ...state,
        downloadFileProcessign: false,
        downloadFileSuccess: true,
        downloadFileFail: false,
        downloadFileMessage: "File Downloading.",
        downloadFileData: payload,
      };
    case types.DOWNLOAD_FILE_FAILURE:
      return {
        ...state,
        downloadFileProcessign: false,
        downloadFileSuccess: false,
        downloadFileFail: true,
        downloadFileMessage: payload,
        downloadFileData: "",
      };

    default:
      return state;
  }
};
