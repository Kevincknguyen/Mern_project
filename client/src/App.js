import './styles/App.css';
import React, {useState, createContext} from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Home from "./views/Home"
import Karma from "./views/Karma"
import Profile from "./views/Profile"
import Register from "./views/Register"
import Signin from "./views/Signin"

import CurrentContext from './CurrentContext';

function App() {

  const [currentUser,setCurrentUser]=useState("")
  const alterUser=(x)=>setCurrentUser(x)
  const value={currentUser,alterUser};
  


  return (

    <BrowserRouter>
      <div className="App">
      <CurrentContext.Provider value={value}>



     
        <Switch>

          <Route path="/profile/:username">
            <Profile />
          </Route>

          <Route path="/karma">
            <Karma />
          </Route>
          
          <Route path="/signin">
            <Signin />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/">
            <Home />
          </Route>

        </Switch>

        </CurrentContext.Provider >
      </div>
    </BrowserRouter>
  );
}

export default App;
