import React, { useContext } from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import axios from "../config/axios";
import { IMGUPLAOD_URL } from "../config/urls";
import Navbar from "./Navbar";
import { AuthContext } from "../context/authContext";
import { Get_Image_url } from "../config/urls";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Img() {
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState(false);
  const { jwt } = useContext(AuthContext);
  //const id = window.location.pathname.split("/")[2];
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  //لارسال الصور والعنوان
  const handleSubmit = async (e) => {
    try {
      const tokenValue = localStorage.getItem("token");
      let token = JSON.parse(tokenValue);
      console.log(token);
      e.preventDefault();
      const response = await axios
        .post(
          IMGUPLAOD_URL,
          {
            base64: image.preview,
            title: title,
          },

          {
            headers: {
              authorization: token,
            },
          }
        )

        .then((res) => {
          console.log(res.data);
          setTitle("");
          navigate("/");
        });
    } catch (e) {
      console.log(e);
    }

    console.log(image);
  };
  //كتابة العنوان
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  //رقع الصورة
  const handleFileChange = (e) => {

    
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
    };
    console.log(preview)

    setEdit(true);
    setImage(img);
  };

  useEffect(() => {
    getImage();
  }, []);

  //جلب الصورة
  const getImage = async () => {
    setShowLoading(true);
    try {
      const tokenValue = localStorage.getItem("token");
      let token = JSON.parse(tokenValue);

      const img = axios
        .get(Get_Image_url + "/" + id, {
          headers: {
            authorization: token,
          },
          //image:image
        })
        .then((res) => {
          console.log(res.data.data);
          setPost(res.data);
          setShowLoading(false);
          setEdit(false);
        });
    } catch (e) {
      console.log(e);
      setShowLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Upload to server</h1>
      {image.preview && <img src={image.preview} width="100" height="100" />}
      {edit ? (
        <form onSubmit={handleSubmit} >
          <div className="input-edit">
            <input
              type="text"
              value={title}
              placeholder="العنوان"
              onChange={handleTitleChange}
            ></input>
            <button type="submit">Submit</button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <input
            accept="image/"
            type="file"
            name="file"
            onChange={handleFileChange}
            alt={image.title}
          ></input>
          <button type="submit">Submit</button>
        </form>
      )}
      {status && <h4>تم ارسال الصورة</h4>}

      {showLoading
        ? setShowLoading(false)
        : post && (
            <Grid container>
              {post.data.map((img) => {
                return (
                  <>
                    <Card sx={{ width: 345 }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image={img.image}
                        title={img.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {img.title}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Link to={`/edit-title/${img._id}`} style={{textDecoration:"none"}} >عرض المنشور</Link>
                      </CardActions>
                    </Card>
                    
                  </>
                );
              })}
            </Grid>
          )}
    </div>
  );
}
export default Img;
