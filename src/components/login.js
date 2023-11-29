import React, { useEffect, useState } from "react";
import "../styles/login.css"
import axios from "../config/axios";
import { LOGIN_URL } from "../config/urls";
import { useNavigate } from "react-router-dom";




function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

   

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      await axios.post(LOGIN_URL, {
          email: email,
          password: password,
        })
        .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.accessToken));
          console.log(res.data);
          navigate("/upload-image");
          
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
      <div className="mycard">
        <div className="card auth-card input-field">
          <h2> Geeks For Geeks </h2>
          <h3> Sign-up Form </h3>

          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            required
            onChange={(e) => {
              handleEmailChange(e);
            }}
          />
          <br />

          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            required
            onChange={(e) => {
              handlePasswordChange(e);
            }}
          />
          <br />
          <input onClick={(e) => {handleSubmit(e)}} type="submit" value="تسجيل الدخول"/>
        </div>
        </div>
      </header>
      
    </div>
  );
}

export default LogIn;
