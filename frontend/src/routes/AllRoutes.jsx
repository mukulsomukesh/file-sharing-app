import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../components/AllRoutes/PrivateRoutes";
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
            <PrivateRoutes>
              <UploadFiles />
            </PrivateRoutes>
          }
        ></Route>
       
       <Route path="/Authentication" element={<Authentication />}></Route>

       <Route path="/Download/:id" element={<DownloadFile />}></Route>

       <Route path="/UploadFileSuccess" element={ <UploadFileSuccess /> }></Route>

       <Route path="*" element={<h1> Nothing over here </h1>}></Route>

      </Routes>
    </>
  );
}
