import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import '../styles/singup.css';
import axios from "../config/axios";
import { REGISTER_URL } from '../config/urls';
import { useNavigate } from 'react-router-dom';



function REGISTER() {
	const [name , setName] = useState('');
	const [email , setEmail] = useState('');
	const [password , setPassword] = useState('');
	const [confPassword , setConfPassword] = useState('');
	let navigate = useNavigate();



	const handleChange =(e)=>{
	setName(e.target.value);
	}
	
	const handleEmailChange =(e)=>{
	setEmail(e.target.value);
	}

	const handlePasswordChange =(e)=>{
	setPassword(e.target.value);
	}
	
	const handleConfPasswordChange =(e)=>{
	setConfPassword(e.target.value);
	}
	
	const handleSubmit= async (e)=>{
	
		if(password!=confPassword){
			alert("password Not Matc");
		}
		try{
		const user = await axios.post(REGISTER_URL,{
				name:name,
				email:email,
				password:password,
				confPassword:confPassword
				}).then(res=>{
					res.status(200).json({message:"تم تسجيل الحساب"});
					alert("تم تسجيل الحساب");
					navigate("/login")
				})
			}catch(e){
				console.log(e);
			}

		
			
		
	
}
return (
	<div className="App">
	<header className="App-header">
	<form onSubmit={(e) => {handleSubmit(e)}}>
	
	<h2> Geeks For Geeks </h2>
	<h3> Sign-up Form </h3>
	
		<label >
		Name:
		</label><br/>
		<input type="text" value={name} required onChange={(e) => {handleChange(e)}} /><br/>
		
		<label>
		Email:
		</label><br/>
		<input type="email" value={email} required onChange={(e) => {handleEmailChange(e)}} /><br/>
		
		<label>
		Password:
		</label><br/>
		<input type="password" value={password} required onChange={(e) => {handlePasswordChange(e)}} />
			
		<label>
            <br/>
		Confirm Password:
		</label>
        <br/>
		<input type="password" value={confPassword} required onChange={(e) => {handleConfPasswordChange(e)}} />
        <br/>
		<input type="submit" value="Submit"/>
	</form>
	</header>
	</div>
);
}

export default REGISTER;
