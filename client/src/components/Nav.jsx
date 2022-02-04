import axios from 'axios';
import React from 'react';
import StyledNav from './NavStyle'

const Nav = (props) => {


    const logoutHandler=()=>{
        axios.get(`http://localhost:8000/api/users/account/logout`, {withCredentials:true})
        .then(res=>{
            props.reload()
            console.log("Logout")
        })
        .catch(err => console.log(err))
    }

    return (
        <StyledNav>
            <div style={{marginLeft:"20px"}}>
                <p>HELLO</p>
                <p>THERE</p>
            </div>
            <div><input type="text"></input></div>
            <div style={{marginRight:"20px"}}>
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </StyledNav>
    )

};

export default Nav;
