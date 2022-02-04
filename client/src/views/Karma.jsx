import Nav from "./../components/Nav";
import React, {useState, useEffect} from "react"
import axios from "axios"

    

const Karma = () => {
  
  const [secret,setSecret]=useState("")
  useEffect(()=>{
    axios.get(`http://localhost:8000/secret`)
      .then(res => setSecret(res.data.message))
      .catch()
  },[])
  
  return (
    
    <div style={{height:"2000px", backgroundColor: "rgb(24,24,24)"}}>
      <Nav />
      <div style={{marginTop:"70px"}}>
        <h1>Hello</h1>
        <h1>{secret}</h1>
        {/* {usertoken?"Hello":"Try again"} */}
      </div>
    </div>
  )
  
  
  
};

export default Karma;
