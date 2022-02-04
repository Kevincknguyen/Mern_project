import React, {useState, useEffect} from 'react';
import io from "socket.io-client"
import jwt_decode from "jwt-decode";

const Chat = () => {

  const [message,setMessage]=useState("")
  const[chat,setChat]=useState([])
  const [socket]=useState(()=>io(':8000'))

  const scroll=()=>{
    let chatTest=document.getElementById("chat")
    console.log(chatTest.scrollHeight)
    chatTest.scrollTo(0,chatTest.scrollHeight)
  }
 

  const submitHandler=(e)=>{
    e.preventDefault()
    // setReload(!reload)
    // console.log(reload)
    // setChat([...chat,{message: message}])
    if (message){
      let name=""
      if(document.cookie){
        let token=document.cookie.split("=")
        var decoded=jwt_decode(token[1])
        name=decoded.username
      }
      else{name="Guest"}
      socket.emit("chat_message",{username:[name],content:message});
      setMessage("")
    }
    console.log(document.cookie)
  }

  useEffect(()=>{
    socket.on("chat_board",(msg)=>{
    setChat(chat=>[...chat,msg])
    
    scroll()
    }) 
    
    return ()=>socket.disconnect(true)
    
  },[socket])

  return (
    <div style={{flex:1,height: "100%"}}>
      <div id="chat" style={{border:"solid gray",height:"79vh",margin:"15px", overflowY:"scroll",wordBreak:"break-all"}}>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>
        <div style={{border:"solid red"}}>1</div>

        {chat.map((item,i)=><div key={i}>{item.username}:{item.content}</div>

        )}
      </div>
      <div style={{margin:"15px",}}>
        <form onSubmit={submitHandler}>
        <textarea name="message" style={{resize:"none",backgroundColor:"rgb(42,42,42)", color:"white",overflowY:"scroll", overflowX:"hidden",width:"100%"}} type="textarea" onChange={(e)=>setMessage(e.target.value)} value={message} />
        <button style={{color:"black"}}>Submit</button>
        </form>
      </div>
    </div>
    

)};

export default Chat;
