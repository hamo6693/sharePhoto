import React, { useEffect, useState } from "react";
import "../styles/login.css"
import axios from "../config/axios";
import { LOGIN_URL } from "../config/urls";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";



function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const validationSchema = yup.object({
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

  });

   

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  

  const onSubmit = async (values) => {
    const loginForm = {email,password}
    try {
      await axios.post(LOGIN_URL,values)
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
    <Formik
    initialValues={{
      name: null,
      email: null,
      password: null,
      confPassword: null,
    }}
    validationSchema={validationSchema}
    onSubmit={(values, { resetForm }) => {
      console.log(values);
      onSubmit(values);
      resetForm({ values: "" });
    }}
  >
       {(formikProps) => (
     <div class="container">
     <div class="text">تسجيل الدخول</div>
     <form onSubmit={formikProps.handleSubmit}>
       <div className="form-row">
         <div class="input-data">
           <input
             name="email"
             type="email"
             value={formikProps.values.email}
             onChange={formikProps.handleChange}
           />
           <div class="underline"></div>
           <label for="">Email</label>
           <div className="worring">
             {formikProps.touched.email && formikProps.errors.email}
           </div>
         </div>

         <div class="input-data">
           <input
             name="password"
             type="password"
             value={formikProps.values.password}
             onChange={formikProps.handleChange}
           />
           <div class="underline"></div>
           <label for="">password</label>
           <div className="worring">
             {formikProps.touched.password && formikProps.errors.password}
           </div>
         </div>

        
       </div>
       <div class="form-row submit-btn">
         <div class="input-data">
           <div class="inner"></div>
           <input type="submit" value="تسجيل الدخول" />
         </div>
       </div>
     </form>
   </div>
    
       )}
    </Formik>
  );
}

export default LogIn;
