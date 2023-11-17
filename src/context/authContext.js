import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [loggedIn,setLoggedIn] = useState(false);
    const [jwt,setJwt] = useState();
    
    useEffect(()=>{
        getAuthentcated()
    },[])
    
    const getAuthentcated = async () => {
        const token = localStorage.getItem("token",JSON.stringify());
        //console.log(token);
        if(token) {
            setJwt(token)
            setLoggedIn(true);
        }else{
            setLoggedIn(false)
        }
    }
    return(
        <AuthContext.Provider value={{loggedIn,setLoggedIn,jwt,setJwt}}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider