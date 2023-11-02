import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const auth = getAuth();

  let navigate = useNavigate();
  let[email, setEmail] = useState("")
  let [alert, setAlert] = useState(false)
  

  let handleChange =(e)=>{
    setEmail(e.target.value) 
    // console.log(e.target.value)
    // console.log(e.target.name)
  
    
  
  }

let handleForgot =() =>{

  
  sendPasswordResetEmail(auth, email).then((e) => {
    navigate("/login")
    setAlert(false)  
  
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorCode,  errorMessage)
    console.log(errorMessage.includes("email"))
   
    if(errorMessage.includes("email")){
      setAlert(true)
      
    }
  });
}

  return (
    <div className='forgotpage'>
      <div className='forgotbox'>
      <h3>Forgot password</h3>
      <TextField onChange={handleChange} name='email' id="outlined-basic" label="Email" variant="outlined" />
      <Button onClick={handleForgot} variant="contained">Send</Button>
      {
        alert &&
        <Alert severity="error">Invalid email error!</Alert>
      }
      </div>
      </div>
  )
}

export default ForgotPassword