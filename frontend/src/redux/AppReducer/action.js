import axios from "axios";
import * as types from "./actionTypes";

// upload file function
const uploadToServer =
  (name, fileType, password, isProtected, pic) => (dispatch) => {
    dispatch({ type: types.UPLOAD_FILE_PROCESS });

    axios
      .post(
        "https://file-sharing-w3xp.onrender.com/api/upload",
        {
          name: name,
          fileType: fileType,
          password: password,
          isProtected: isProtected,
          pic: pic,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        // if we get response
        dispatch({ type: types.UPLOAD_FILE_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: types.UPLOAD_FILE_FAILURE });
      });
  };


  // get All Files
  const getAllFiles = (dispatch) => {
    dispatch({ type: types.ALL_FILES_LOADING });

    axios.get(
        "https://file-sharing-w3xp.onrender.com/api/get",{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        // if we get response
        console.log(res);
        dispatch({ type: types.ALL_FILES_LOADING_SUCCESS, payload:res.data.posts});
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: types.ALL_FILES_LOADING_FAILURE });
      });
  }


export { uploadToServer, getAllFiles };
