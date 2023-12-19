import React, { useState } from "react";
import "../styles/App.css";
import axios from "../config/axios";
import { REGISTER_URL } from "../config/urls";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

function REGISTER() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate();

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
      .required("يجب ادخال كلمة المرور"),
  });

  const onSubmit = async (values) => {
    if (password !== confPassword) {
      alert("password Not Matc");
    }

    try {
      await axios.post(REGISTER_URL, values).then((res) => {
        console.log(res);
        navigate("/login");
      });
    } catch (e) {
      console.log(e);
      console.log("ناكد من البيانات");
      val()
    }
  };
  
  const val = () => {
    alert("قم بالتاكد من البريد الالكتروني او كلمة المرور")
  }
  return (
    <Formik
      initialValues={{
        name: null,
        email: null,
        password: null,
        confPassword: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        onSubmit(values);
        
      }}
    >
      {(formikProps) => (
        <div class="container">
          <div class="text">resgister</div>
          <form onSubmit={formikProps.handleSubmit}>
            <div className="form-row">
              <div class="input-data">
                <input
                  name="name"
                  type="text"
                  value={formikProps.values.name}
                  onChange={formikProps.handleChange}
                />
                <div class="underline"></div>
                <label for="">First Name</label>
                <div className="worring">
                  {formikProps.touched.name && formikProps.errors.name}
                </div>
              </div>

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

              <div class="input-data">
                <input
                  name="confPassword"
                  type="password"
                  value={formikProps.values.confPassword}
                  onChange={formikProps.handleChange}
                />
                <div class="underline"></div>
                <label for="">confPassword</label>
                <div className="worring">
                  {formikProps.touched.confPassword &&
                    formikProps.errors.confPassword}
                </div>
              </div>
            </div>
            <div class="form-row submit-btn">
              <div class="input-data">
                <div class="inner"></div>
                <input type="submit" value="submit" />
              </div>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
}

export default REGISTER;
