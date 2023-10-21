import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './singup.css';
import axios from "./config/axios";
import { LOGIN_URL } from './config/urls';
import useAuth from './hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';


function LogIn() {
	
	const [email , setEmail] = useState('');
	const [password , setPassword] = useState('');
	const {setAuth} = useAuth();

	const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

	
	const handleEmailChange =(e)=>{
	setEmail(e.target.value);
	}

	const handlePasswordChange =(e)=>{
	setPassword(e.target.value);
	}
	
	const handleSubmit= async (e)=>{

    try{
            await axios.post(LOGIN_URL,{
				email:email,
				password:password,

			}).then(res=>{
                console.log("تم تسجيل الدخول");
				localStorage.setItem("token",JSON.stringify(res.data));
				navigate("/upload-image")

            })
	
    } catch(e) {
        console.log(e);
    }
	
    }
return (
	<div className="App">
	<header className="App-header">
	<form onClick={() =>{handleSubmit()}}>
	
	<h2> Geeks For Geeks </h2>
	<h3> Sign-up Form </h3>
	
	
		
		<label>
		Email:
		</label><br/>
		<input type="email" value={email} required onChange={(e) => {handleEmailChange(e)}} /><br/>
		
		<label>
		Password:
		</label><br/>
		<input type="password" value={password} required onChange={(e) => {handlePasswordChange(e)}} />
        <br/>
		<input type="submit" value="Submit"  />
	</form>
	</header>
	</div>
);
}

export default LogIn;
