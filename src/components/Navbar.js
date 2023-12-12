import { useContext } from "react";
import "../styles/navbar.css";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
    const { loggedIn } = useContext(AuthContext);
    console.log(loggedIn);

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