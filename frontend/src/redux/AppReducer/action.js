import axios from "axios";
import * as types from "./actionTypes";

// upload file function
const uploadToServer = (name, fileType, password, isProtected, pic) => (dispatch) => {
  dispatch({ type: types.UPLOAD_FILE_PROCESS});

let ret;

axios.post('https://file-sharing-w3xp.onrender.com/api/upload', 
{ name:name, fileType:fileType, password:password, isProtected:isProtected, pic:pic },
 {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
})
.then((res)=>{
  // if we get response
  console.log("res",res)
  dispatch({ type: types.UPLOAD_FILE_SUCCESS });
})
.catch((err)=>{
    console.log("uploading")
    dispatch({ type: types.UPLOAD_FILE_FAILURE});
})


};



export { uploadToServer};
