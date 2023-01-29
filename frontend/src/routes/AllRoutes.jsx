import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoutes from '../components/AllRoutes/PrivateRoutes'
import Authentication from './Authentication'
import Home from './Home'

export default function AllRoutes() {
  return (
<>

<Routes>
    <Route path="/" element={  <PrivateRoutes>  <Home />  </PrivateRoutes>} ></Route>
    <Route path="/authentication" element={<Authentication />} ></Route>
</Routes>

</>
  )
}
