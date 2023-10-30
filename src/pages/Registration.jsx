import React, { useState } from 'react'
import Image from '../components/Image'
import bg from "../assets/one.png"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import Alert from '@mui/material/Alert';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { RotatingLines } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Registration = () => {

  const auth = getAuth();
  

  // let [fullname, setFullname] = useState("")
  // let [email, setEmail] = useState("")
  // let [password, setPassword] = useState("")

  let [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  })

  // let [error, setError] = useState("")

  let [fullnameError, setFullnameError] = useState("");
  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [open, setOpen] = useState(true);
  let [load, setLoad] = useState(false);
  let navigate = useNavigate();

  let handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    if(e.target.name == "fullname"){
      setFullnameError("")
    }
    if(e.target.name == "email"){
      setEmailError("")
    }
    if(e.target.name == "password"){
      setPasswordError("")
    }

      // setFullnameError("")
      // setEmailError("")
      // setPasswordError("")
  }

  // let handleOpen = () =>{
  //   if(open){
  //     setOpen(false)
  //   }else{
  //     setOpen(true)
  //   }
  // }

  let handleRegistration = () =>{

    if(!formData.fullname){
      setFullnameError("Required Fullname!")
    }

    if(!formData.email){
      setEmailError("Required Email!")
    }
    if(!formData.password){
      setPasswordError("Required Password!")
    }

    if(formData.fullname && formData.email && formData.password){

      let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

      if(!pattern.test(formData.email)){
        setEmailError("Invalid Email")
      }

      if(formData.fullname.length < 4) {
        setFullnameError("Must be More than 3 Words!")
      }

      if(!re.test(formData.password)){
        setPasswordError("Password not strong!")
      }

      setLoad(true)


    }

    createUserWithEmailAndPassword(auth, formData.email, formData.password).then(()=>{
      sendEmailVerification(auth.currentUser).then(()=>{
        setFormData({
          fullname: "",
          email: "",
          password: ""
        })
        setLoad(false)
        toast.success('Registration Successful, Please verify your email...', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });

          setTimeout(()=>{
            navigate("/login")
          }, 1000)
      })
      
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode.includes("email")){
        toast.error('Email already exist...', {
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
      setLoad(false)
    });

  }



  return (
    <div className='registration'>
        <div className='left'>
            <div className='text-container'>
            <h2>Get started with easily register</h2>
            <p>Free register and you can enjoy it</p>
            <div className='box'>
            <TextField onChange={handleChange} name='fullname' className='inputCss' type="text" id="outlined-basic" label="Full Name" variant="outlined" value={formData.fullname} />  
            {
              fullnameError &&
              <Alert className='alert' variant="filled" severity="error">
              {fullnameError}
              </Alert> 
            }
            <TextField onChange={handleChange} name='email'  className='inputCss' type="Email" id="outlined-basic" label="Email Address" variant="outlined" value={formData.email} />
            {
              emailError &&
              <Alert className='alert' variant="filled" severity="error">
              {emailError}
              </Alert> 
            }
            <div>
            <TextField onChange={handleChange} name='password'  className='inputCss' type={open ?"password" : "text" } id="outlined-basic" label="Password" variant="outlined" value={formData.password} />
            {
              open
              ?
              <AiFillEye onClick={()=>setOpen(false)} className='eye'/>
              :
              <AiFillEyeInvisible onClick={()=>setOpen(true)} className='eye'/>
            }
            </div>
            {
              passwordError &&
              <Alert className='alert' variant="filled" severity="error">
              {passwordError}
              </Alert> 
            }

            {
              load
              ?
               <Button variant="contained" disabled className='regbtnd' >
                <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
                />
                </Button> 
              :
              <Button onClick={handleRegistration} className="regbtn" Varient="contained">Sign up</Button>

            }
            
            </div>
            
            <p className='focus'>Already  have an account ? <Link className='Link' to="/login">Sign in</Link></p>
   
   
            </div>
        </div>
        <div className='right'>
            <Image className="bg" src={bg}/>
        </div>
    </div>
  )
}

export default Registration