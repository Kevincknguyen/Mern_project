import React, { useEffect, useState } from 'react';
import Nav from './../components/Nav'
import { useParams, useHistory } from "react-router-dom"
import axios from "axios"
import jwt_decode from "jwt-decode";


const Profile = () => {

    const [oneUser, setOneUser] = useState(null)
    const [currentUser, setCurrentUser] = useState("")
    const { username } = useParams()
    const history = useHistory()
    let [errorArray, seterrorArray] = useState([])

    const tabHandler = (x) => {
        let tabcontent = document.getElementsByClassName("tab");
        for (let i = 0; i < tabcontent.length; i++) {
            console.log(tabcontent[i])
            tabcontent[i].style.display = "none"
        }
        console.log(x)
        document.getElementById(x).style.display = "block"

    }
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${username}`)
            .then(res => setOneUser(res.data))
            .catch(err => console.log(err));
        if (document.cookie) {
            let token = document.cookie.split("=")
            var decoded = jwt_decode(token[1])
            setCurrentUser(decoded.username)
            console.log(currentUser)

        }
        else {
            console.log("No logged in User")
        }

    }, [])

    const submitHandler = e => {
        e.preventDefault()
        seterrorArray([])
        axios.put(`http://localhost:8000/api/users/${username}`, oneUser)
            .then(res => history.push("/"))
            .catch(err => {
                console.log(err.response.data)
                const errResponse = err.response.data.errors
                console.log(errResponse)
                let tempArr = [];
                for (const key of Object.keys(errResponse)) {

                    tempArr.push(errResponse[key].message)

                }
                seterrorArray(tempArr)
            })
    }

    const resultHandler=e=>{
        
        
            setOneUser({...oneUser,
                [e.target.name]:e.target.value
            })
        
    }

    const reload = () => {
        history.push("/")
    }
    return (

        <div style={{ height: "100vh" }}>
            <Nav reload={reload} />
            <div style={{ height: "8vh" }}>awd</div>
            <div>
                <h1>Profile</h1>
                <div>
                    <button id="Start" class="tablinks" name="Info" onClick={(e) => tabHandler(e.target.name)}>Account</button>
                    <button class="tablinks" name="Settings" onClick={(e) => tabHandler(e.target.name)}>Settings</button>
                    <button class="tablinks" name="Emotes" onClick={(e) => tabHandler(e.target.name)}>Emotes</button>
                </div>
                {
                    oneUser ?

                        <div>
                            <div id="Info" className="tab">
                                Username:{oneUser.username}<br />
                                Email: {oneUser.email}<br />
                                Dob: {oneUser.dob}<br />
                                Bio: {oneUser.bio ? <p>{oneUser.bio}</p> : <p>No bio</p>}
                                Points: {oneUser.points}<br />
                                {oneUser.profile_image}
                                {currentUser === oneUser.username ? <p><button onClick={e => tabHandler("Edit")}>Edit</button></p> : <p>Not logged in</p>}
                            </div>
                            <div style={{ display: "none", border: "solid red" }} id="Settings" className="tab">
                                <p>Setings</p>
                            </div>
                            <div style={{ display: "none", border: "solid red" }} id="Emotes" className="tab">
                                <p>Emotes</p>
                            </div>
                            <div style={{ display: "none", border: "solid red" }} id="Edit" className="tab">
                                <button onClick={e => tabHandler("Info")}>Cancel</button>
                                <form onSubmit={submitHandler}>

                                    <p>
                                        <label>Username</label>
                                        <input type="text" name="username" onChange={e => resultHandler(e)} value={oneUser.username} />
                                    </p>
                                    <p>
                                        <label>Bio</label>
                                        <input type="text" name="bio" onChange={e => resultHandler(e)} value={oneUser.bio} />
                                    </p>
                                    <p>
                                        <label>DOB</label>
                                        <input type="date" name="dob" onChange={e => resultHandler(e)} value={oneUser.dob} />
                                    </p>
                                    <p>
                                        <label>Email</label>
                                        <input type="text" name="email" onChange={e => resultHandler(e)} value={oneUser.email} />
                                    </p>
                                    <p>
                                        <label>Picture</label>
                                        <input type="text" name="profile_image" onChange={e => resultHandler(e)} value={oneUser.profile_image} />
                                    </p>
                                    <button type="submit">COnfirm</button>

                                </form>
                                {
                                    errorArray.map((err, i) => (
                                        <p key={i}>{err}</p>
                                    ))
                                }

                            </div>
                        </div>



                        : <p>No user found</p>}
            </div>
        </div>

    )
};

export default Profile;