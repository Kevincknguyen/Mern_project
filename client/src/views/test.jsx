import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom"
import Nav from './../components/Nav'
import axios from "axios"
import jwt_decode from "jwt-decode";


const Profile = () => {
  const[oneUser,setOneUser]=useState(null)
  
  const [users,setUsers]=useState(null)
  useEffect(() => {
    axios.get('http://localhost:8000/api/users', {withCredentials:true}) 
          .then(res => {
            console.log(res.data)
            setUsers(res.data)
            console.log(users)
        
        }).catch(err => {
            console.log(err)
            setUsers("")
        })
}, [])


  const decodeHandler=(req,res)=>{
    console.log(document.cookie)
    // let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmEzZjNkMTNmMjBmZDg5OTk1ODNiMiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NDM5NDIxMDN9.xoR6LWIQ_GlqDLX1zMR3VMjSOZ7eXLuO7jW9MU4uIz0"
    // var decoded=jwt_decode(token)
    // console.log(decoded)
  }

  return (
  
    <div style={{height:"2000px", backgroundColor: "rgb(24,24,24)"}}>
      <Nav />
      <div style={{marginTop:"70px"}}>
        <h1>Profile</h1>
        {users?users.map((user,i)=><div key={i}>{user.username}</div>):<p>Unauthorized</p>}
      </div>
      <button onClick={decodeHandler}>Decode</button>
    </div>
   
    )
};

// export default Profile;
