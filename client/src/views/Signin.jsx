import React, {useState, useContext} from 'react';
import './../styles/Signin.css'
import {Link, useHistory} from "react-router-dom"
import axios from "axios"
import CurrentContext from "./../CurrentContext"

const Signin = (props) => {

  let [result, setResult] = useState({username:"",password:""})
  let[error,seterror]=useState([])
  const history = useHistory()

  const {currentUser,setCurrentUser}=useContext(CurrentContext);

  const check=()=>{
    console.log(currentUser)
    console.log("Hi")
    setCurrentUser("signin")
  }

  const submitHandler = e => {
    e.preventDefault()
    seterror([])
    axios.post('http://localhost:8000/api/users/account/login',result, {withCredentials:true})
    .then(res=>(console.log('THIS IS RES',res),console.log(res.data.usertoken),history.push("/")))
    .catch(err=>{
        console.log(err.response.data)
        const errResponse=err.response.data.errors
        console.log(errResponse)
        let tempArr=[];
        for (const key in errResponse){
            if(errResponse.hasOwnProperty(key)){
                tempArr.push(errResponse[key].message)
            }
        }
        seterror(tempArr)
    })
    // setResult({username:"",password:""})
    

}
  const resultHandler=e=>{
    setResult({...result,
    [e.target.name]:e.target.value})
  }



  return (
  <div style={{ backgroundColor: "rgb(24,24,24)", height:"100vh"}}>
      
    <div class='Box'>
      <h3>Sign in</h3>
      <h5>to continue to //redacted//</h5>
    <form onSubmit={submitHandler}>
      <div class='Form'>
        <p>
          <label>Username: </label>
          <input type="text" size="29" name="username" onChange={e => resultHandler(e)} value={result.username} /><br/>
          <Link to={`/`}>Forgot username?</Link>
        </p>
        <p>
          <label>Password: </label>
          <input type="password" size="30" name="password" onChange={e => resultHandler(e)} value={result.password} /><br/>
          <Link to={`/`}>Forgot password?</Link>
        </p>
      </div>
    
      <p><button type="submit" style={{color:"black"}}>Submit</button></p>
      </form>
      <p><Link to={`/register`}>Create account</Link></p>

    </div>
  <CurrentContext.Consumer>
    {({currentUser,setCurrentUser})=>(
      <button 
      onClick={check}
      >
        Press This
        </button>)

   }
  </CurrentContext.Consumer>

  </div>
  )
};

export default Signin;
