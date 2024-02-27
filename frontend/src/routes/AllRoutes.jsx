import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../components/privateRoute/PrivateRoutes";
import Error from "../components/DisplayFiles/Error";
import DisplayFiles from "./DisplayFiles";
import DownloadFile from "./DownloadFile";
import UploadFiles from "./UploadFiles";
import UploadFileSuccess from "./UploadFileSuccess"
import FileMoreInfo from "./FileMoreInfo";
import Signup from "../components/Authentication/Signup";
import Login from "../components/Authentication/Login";

export default function AllRoutes() {
  return (
    <>
      <Routes>
       
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <DisplayFiles />
            </PrivateRoutes>
          }
        ></Route>
       
        <Route
          path="/upload_files"
          element={
                        <PrivateRoutes> <UploadFiles /> </PrivateRoutes>
          }
        ></Route>
       
       <Route path="/signup" element={<Signup />}></Route>

       <Route path="/login" element={<Login />}></Route>

       <Route path="/download/:id" element={ <PrivateRoutes> <DownloadFile />  </PrivateRoutes>  }></Route>

       <Route path="/upload_file_success" element={ <PrivateRoutes> <UploadFileSuccess /> </PrivateRoutes> }></Route>

       <Route path="/file/:id" element={ <PrivateRoutes> <FileMoreInfo /> </PrivateRoutes> }></Route>

       <Route path="*" element={<Error /> }></Route>

      </Routes>
    </>
  );
}
