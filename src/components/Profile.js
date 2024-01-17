import React, { useEffect, useState } from "react";
import "../styles/App.css";
import axios from "../config/axios";
import { GET_PROFILE, UPDATE_PROFILE } from "../config/urls";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { NestCamWiredStand } from "@mui/icons-material";

function Profile() {
  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [confPassword,setConfPassword] = useState("");

  const validationSchema = yup.object({
    name: yup.string().nullable().required("اسم المستخدم مطلوب"),
    email: yup
      .string()
      .nullable()
      .email(" البريد الالكتروني مطلوب")
      .required("البريد الالكتروني مطلوب"),
    password: yup
      .string()
      .nullable()
      .min(5, "less 5 letter")
      .required("يجب ادخال كلمة المرور"),
    confPassword: yup
      .string()
      .nullable()
      .min(5, "less 5 letter")
      .required("يجب ادخال كلمة المرور")
      .test("match", "كلمة المرور غير مطابقة", function (confPassword) {
        return confPassword === this.parent.password;
      }),
  });

  useEffect(() => {
    getProfile()
  },[])
  const getProfile = async () => {
    try {
      const tokenValue = localStorage.getItem("token");
      let token = JSON.parse(tokenValue);
      
       await axios
        .get(GET_PROFILE, {
          headers: {
            authorization: token,
          },

        })
        .then((res) => {
          console.log(res);
          setEmail(res.data.email);
          setName(res.data.name);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    if(password !== confPassword ) {
        alert("قم بتأكيد كلمة المرور الصحيحة")
        
      }else{
        const tokenValue = localStorage.getItem("token");
        let token = JSON.parse(tokenValue);
      try {
        e.preventDefault();
       
        await axios.put(UPDATE_PROFILE,{
              name: name,
              password:password,
              confPassword: confPassword,
            },
           
            
  
            {
              headers: {
                authorization: token,
              },
            }
          )
  
          .then((res) => {
            console.log(res.data);
  
            navigate("/");
          });
      } catch (e) {
        console.log(e);
      }
      }
   
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
  };
  
  
  return (
  
    
        <div class="container">
          <div class="text">تعديل البيانات</div>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
            <div class="input-data">
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
                
                <div class="underline"></div>
                <label for="">First Name</label>
                
              </div>
              <div class="input-data">
                <input
                  name="email"
                  type="email"
                  value={email}
                  disabled
                />
                
                <div class="underline"></div>
                
                <label for="" style={{bottom:"30px",fontSize:"14px"}}>Email</label>
              </div>

              <div class="input-data">
                <input
                  name="password"
                  type="password"
                  value={password}
                  minLength="5"
                  onChange={handlePasswordChange}
                />
                <div class="underline"></div>
                <label for="" style={{bottom:"23px"}}>password</label>
              
              </div>
              <div class="input-data">
                <input
                  name="confPassword"
                  type="password"
                  value={confPassword}
                  minLength="5"
                  onChange={handleConfPasswordChange}
                />
                <div class="underline"></div>
                <label for="" style={{bottom:"23px"}}>confPassword</label>
               
              </div>
            </div>
            <div class="form-row submit-btn">
              <div class="input-data">
                <div class="inner"></div>
                <input type="submit" value="تعديل" />
              </div>
            </div>
          </form>
        </div>
      )
    
  
}

export default Profile ;
