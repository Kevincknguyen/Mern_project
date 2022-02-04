import React from"react"

const CurrentContext=React.createContext({
    currentUser:"test",
    alterUser:()=>{}
})


export default CurrentContext;