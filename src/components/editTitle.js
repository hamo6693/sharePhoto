import React, { useContext } from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import axios from "../config/axios";
import { EDIT_TITLE, IMGUPLAOD_URL } from "../config/urls";
import Navbar from "./Navbar";
import { AuthContext } from "../context/authContext";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


function EditTitle() {
  
  const [status, setStatus] = useState("");
  //تعديل العنوان
  const [title, setTitle] = useState("");
  const { jwt } = useContext(AuthContext);
  const id = window.location.pathname.split("/")[2];
  const [image, setImage] = useState("");
  const navigate = useNavigate();


   const handleSubmit = async (e) => {
    try {
      const tokenValue = localStorage.getItem("token");
      let token = JSON.parse(tokenValue);
      console.log(token);
      e.preventDefault();
      const response = await axios.put(EDIT_TITLE + "/" + id,{
            title:title
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

    
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      const tokenValue = localStorage.getItem("token");
      let token = JSON.parse(tokenValue);
      //console.log(token);

      const img = axios
        .get(EDIT_TITLE + "/" + id, {
          headers: {
            authorization: token,
          },
          title: title,
        })
        .then((res) => {
          setTitle(res.data.data.title);
          setImage(res.data.data.image);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handlerDelete = async(req,res) => {
    const tokenValue = localStorage.getItem("token");
      let token = JSON.parse(tokenValue);
    const deleteImg = axios.delete(IMGUPLAOD_URL + "/" + id,{
      headers: {
        authorization: token,
      },
      id:id
    }).then(res => {
      console.log("تم الحذف");
    })
  }

  return (
    <>
      <Navbar></Navbar>
      <h1>تعديل العنوان</h1>
      <Card sx={{ width: 345 }}>
        <CardMedia sx={{ height: 140 }} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
        <CardActions>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              placeholder="العنوان"
              onChange={handleTitleChange}
            ></input>
            <button type="submit">تعديل</button>
            <button type="submit" onClick={() => {handlerDelete()}}>حذف</button>
          </form>
        </CardActions>
      </Card>
    </>
  );
}
export default EditTitle;
