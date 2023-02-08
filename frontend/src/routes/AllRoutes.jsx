import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../components/AllRoutes/PrivateRoutes";
import Authentication from "./Authentication";
import DisplayFiles from "./DisplayFiles";
import DownloadFile from "./DownloadFile";
import UploadFiles from "./UploadFiles";

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

       <Route path="/Download" element={<DownloadFile />}></Route>
      </Routes>
    </>
  );
}
