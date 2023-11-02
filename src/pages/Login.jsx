import React from 'react'
import Image from '../components/Image'
import bgTwo from "../assets/two.jpg"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';
import { toast } from 'react-toastify';
import {FcGoogle} from "react-icons/fc"

const Login = () => {

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  
  let navigate = useNavigate();

  let [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  let handleChange =(e)=>{

    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })

  }

  let handleLogin = () =>{
    signInWithEmailAndPassword(auth, formData.email, formData.password).then((user)=>{
      console.log(user)
      if(user.user.emailVerified){
        navigate("/home")
      }else{
        toast.error('To Login, Please verify your email...', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage.includes("Error"))
      if(errorMessage.includes("Error")){
        toast.error('Password or Email is incorrect!', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    });
  }

  let handleGoogle =()=>{
    signInWithPopup(auth, provider)
  .then(() => {
    navigate("/home")
  })

  }

    

  return (
    <div className='registration'>
    <div className='left'>
        <div className='text-container'>
        <h2>Login to your account</h2>
        
        <div className='box'>

        <div className='relative'>
        <Button onClick={handleGoogle} className="regbtntwo" Varient="contained">Continue with Google</Button>
        <FcGoogle className="google"/>
        </div>
        <TextField onChange={handleChange} name='email' className='inputCss' type="Email" id="standard-basic" label="Email Address" variant="standard" />
        {/* <Alert severity="error">Invalid email error!</Alert> */}
        <TextField onChange={handleChange} name='password' className='inputCss' type="password" id="standard-basic" label="Password" variant="standard" />
        {/* <Alert severity="error">Wrong Password!</Alert> */}
        <Button onClick={handleLogin} className="regbtn" Varient="contained">Login to continue</Button>

        <p className='focus'> Don't have an account? <Link className='Link' to="/">Sign Up</Link></p>
        <p className='focus'> Forget password? <Link className='Link' to="/forgotpassword"> Click Here </Link></p>
        
        </div>
  

        </div>
    </div>
    <div className='right'>
        <Image className="bg" src={bgTwo}/>
    </div>
</div>
  )
}

export default Login