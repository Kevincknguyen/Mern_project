import React, { useState } from 'react';
import './../styles/Signin.css'
import {Link} from 'react-router-dom'
import { useHistory }  from 'react-router-dom'
import axios from "axios"

const Register = () => {

  const history = useHistory()

  let [result, setResult] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    dob: null,
    bio: "",
    profile_image:"",
    settings:{},
    points: 500
  })


  let [errorArray, seterrorArray] = useState([])

  const submitHandler = e => {
    e.preventDefault()
    seterrorArray([])
    axios.post('http://localhost:8000/api/users/register', result, {withCredentials:true})
      .then(res => (console.log(res), console.log("success"), history.push("/")))
      .catch(err => {
        console.log(err.response.data)
        const errResponse = err.response.data.errors
        console.log(errResponse)
        let tempArr = [];
        for (const key in errResponse) {
          if (errResponse.hasOwnProperty(key)) {
            tempArr.push(errResponse[key].message)
          }
        }
        seterrorArray(tempArr)
      })

    // setResult({ username: "", password: "", confirmPassword: "", email: "", dob: 0 })
  }

  const resultHandler = e => {
    console.log(typeof e.target.value)
    console.log(typeof e.target.name)
    console.log(e.target.value)

    setResult({
      ...result,
      [e.target.name]: e.target.value
    })


  }
  return (
    <div style={{ backgroundColor: "rgb(24,24,24)", height: "100vh" }}>

      <div class='Box'>
        <h3>Register</h3>
        <h5>to continue to //redacted//</h5>

        <form onSubmit={submitHandler}>
        <div class='Form'>
          <p>
            <label>Username: </label>
            <input type="text" name="username" size="29" onChange={e => resultHandler(e)} value={result.username} /><br />
          </p>
          <p>
            <label>Password: </label>
            <input type="password" name="password" size="30" onChange={e => resultHandler(e)} value={result.password}/><br />
          </p>
          <p>
            <label>Confirm Password: </label>
            <input type="password" name="confirmPassword" size="30" onChange={e => resultHandler(e)} value={result.confirmPassword} /><br />
          </p>
          <p>
            <label>Email: </label>
            <input type="text" name="email" size="30" onChange={e => resultHandler(e)} value={result.email} /><br />
          </p>
          <p>
            <label>Date of birth: </label>
            <input type="date" name="dob" max='9999-01-01' size="30" onChange={e => resultHandler(e)} value={result.dob} /><br />

          </p>
        </div>
        
        <p><button type="submit" style={{ color: "black" }}>Submit</button></p>
        </form>
        <p><Link to={`/signin`}>Login instead</Link></p>
        {
            errorArray.map((err,i)=>(
                <p key={i}>{err}</p>
            ))
            }
      </div>

    </div>
  )
};

export default Register;
