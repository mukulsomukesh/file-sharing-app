import axios from "axios";
import * as types from "./actionTypes";

// upload file
const uploadToServer = (name, fileType, password, isProtected, pic) => async (dispatch) => {
  dispatch({ type: types.UPLOAD_FILE_PROCESS });
  console.log("uploading");
  try {
    const res = await axios.post(
      "https://puzzled-rose-vulture.cyclic.app/api/upload",
      {
        name: name,
        fileType: fileType,
        password: password,
        isProtected: isProtected,
        pic: pic,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("file-sharing-application-jwt"),
        },
      }
    );
    // console.log(res);
    dispatch({ type: types.UPLOAD_FILE_SUCCESS, payload: res.data.post._id });
  } catch (err) {
    console.log(err);
    dispatch({ type: types.UPLOAD_FILE_FAILURE });
  }
};


// get all files 
const getAllFiles = async (dispatch) => {
  dispatch({ type: types.ALL_FILES_LOADING });
  try {
    const res = await axios.get(
      "https://puzzled-rose-vulture.cyclic.app/api/get",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("file-sharing-application-jwt"),
        },
      }
    );
    // console.log(res.data)
    dispatch({ type: types.ALL_FILES_LOADING_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: types.ALL_FILES_LOADING_FAILURE });
  }
};


// get a single file
const getSingleFile = (id) => async (dispatch) => {
  dispatch({ type: types.SINGLE_FILE_LOADING });
  try {
    const res = await axios.get(
      `https://puzzled-rose-vulture.cyclic.app/api/get/${id}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("file-sharing-application-jwt"),
        },
      }
    );
    // console.log(" action .js  ",res.data)
    dispatch({ type: types.SINGLE_FILE_LOADING_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: types.SINGLE_FILE_LOADING_FAILURE });
  }
};

export { uploadToServer, getAllFiles, getSingleFile };
