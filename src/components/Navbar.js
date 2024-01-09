import { useContext, useEffect, useState } from "react";
import "../styles/navbar.css";
import { AuthContext } from "../context/authContext";
import { GETPROFILE } from "../config/urls";
import axios from "../config/axios";

const Navbar = () => {
    const [nameUser, setNameUser ] = useState();
    const { loggedIn,setLoggedIn } = useContext(AuthContext);
    console.log(loggedIn);

    const logOut = async () => {
         window.localStorage.removeItem("token")
        setLoggedIn(false)
    }

    useEffect(() => {
        getProfile()
      },[])
    
      const getProfile = async () => {
        try {
          const tokenValue = localStorage.getItem("token");
          let token = JSON.parse(tokenValue);
           await axios
            .get(GETPROFILE, {
              headers: {
                authorization: token,
              },
    
              Image: Image,
            })
            .then((res) => {
              console.log(res.data);
              setNameUser(res.data);
              setLoggedIn(true)
            });
        } catch (e) {
          console.log(e);
        }
      };
   

  return (
    <>
    {loggedIn ?
    
    <ul className="list-navbar">
	<li className="list-item">
    <a class="shameless-plug" href="/">
        Home
    </a>
    </li>
	<li className="list-item">
    <a class="shameless-plug" href="/upload-image">
    UPLOAD
    </a>
    </li>

    <li className="list-item" onClick={() => logOut()}>
    <a class="shameless-plug" href="/" >
    logout
    </a>
    <div>{nameUser}</div>
    </li>
    

    
    </ul>
    : 
    <ul className="list-navbar" >
    <li className="list-item">
    <a class="shameless-plug" href="/">
        Home
    </a>
    </li>
    <li className="list-item">
    <a class="shameless-plug" href="/singup">
    REGISTER
    </a>
    </li>
    <a class="shameless-plug" href="/login">
	<li className="list-item">
    LOGIN 
    </li>
    </a>
    </ul> 
    
    }
    

  </>
  )
}

export default Navbar