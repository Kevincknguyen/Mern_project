import React from 'react';
import {useState, useContext} from 'react'
import Chat from "./../components/Chat";
import Nav from "./../components/Nav";
import Video from "./../components/Video";
import "./../styles/Home.css"
import CurrentContext from "./../CurrentContext"

const Home = () => {
  
  const {currentUser,alterUser}=useContext(CurrentContext);


  const[refresh,setRefresh]=useState(true)

  const reload=()=>{
    setRefresh(!refresh)
}



  return (
    <div class="body">
      
      {/* <button onClick={e=>alterUser("awdawdawawd")}>Context button</button> */}
      
      <Nav reload={reload}/>
      <div style={{height:"8vh"}}>awd</div>
      <div class="box">
        <Video />
        <Chat />

      </div>


    </div>
  )
};

export default Home;
