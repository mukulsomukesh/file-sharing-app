import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../components/privateRoute/PrivateRoutes";
import Error from "../components/DisplayFiles/Error";
import Authentication from "./Authentication";
import DisplayFiles from "./DisplayFiles";
import DownloadFile from "./DownloadFile";
import UploadFiles from "./UploadFiles";
import UploadFileSuccess from "./UploadFileSuccess"

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
          path="/UploadFiles"
          element={
                        <PrivateRoutes> <UploadFiles /> </PrivateRoutes>
          }
        ></Route>
       
       <Route path="/Authentication" element={<Authentication />}></Route>

       <Route path="/Download/:id" element={ <PrivateRoutes> <DownloadFile />  </PrivateRoutes>  }></Route>

       <Route path="/UploadFileSuccess" element={ <PrivateRoutes> <UploadFileSuccess /> </PrivateRoutes> }></Route>

       <Route path="*" element={<Error /> }></Route>

      </Routes>
    </>
  );
}
