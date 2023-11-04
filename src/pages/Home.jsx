import React, { useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    const auth = getAuth();
    let navigate = useNavigate();
    let data = useSelector(state=> state.loggedUser.value)

    useEffect(()=>{
      if(!data){
        navigate("/login")
      }
    },[])

    let handleClick = () =>{
        signOut(auth).then(() => {
            navigate("/login")
          })
    }

    

  return (
    <>
    <div style={{display:"Flex", flexDirection:"column" , gap:"10px",justifyContent:"center" , alignItems:"center", width:"100%", height:"100vh"}}>
     <h1 style={{textAlign:"center"}}>Assalamu Alaikum Warrahmatullah!</h1> 
    <Button  onClick={handleClick} variant="contained">Logout</Button>
    <h4 style={{textAlign:"center"}}>Currently we are working on this project!</h4> 
    </div>
    </>
  )
}

export default Home