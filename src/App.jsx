import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Link,

} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer, toast } from 'react-toastify';
import ForgotPassword from "./pages/ForgotPassword";





function App() {

  let router = createBrowserRouter(
    createRoutesFromElements(

     <Route>
       <Route path="/" element={<Registration />}/>
       <Route path="/login" element={<Login />}/>
       <Route path="/home" element={<Home />}/>
       <Route path="/forgotpassword" element={<ForgotPassword />}/>
     </Route>   
    )
  );


  return (
    <>
       <RouterProvider router={router} />
       <ToastContainer/>
    </>
  )
}

export default App








