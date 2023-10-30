import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const auth = getAuth();
    let navigate = useNavigate();
    let handleClick = () =>{
        signOut(auth).then(() => {
            navigate("/login")
          })
    }

  return (
    <>
    <div style={{display:"Flex", flexDirection:"column" , gap:"10px",justifyContent:"center" , alignItems:"center", width:"100%", height:"100vh"}}>
     <h1>Assalamu Alaikum Warrahmatullah!</h1> 
    <Button  onClick={handleClick} variant="contained">Logout</Button>
    </div>
    </>
  )
}

export default Home