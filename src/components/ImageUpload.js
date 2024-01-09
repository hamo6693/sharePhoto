import React from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import axios from "../config/axios";
import { IMGUPLAOD_URL } from "../config/urls";
import { Get_Image_url } from "../config/urls";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Img() {
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const { id } = useParams();
  const [post, setPost] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const { jwt } = useContext(AuthContext);


  const handleSubmit = async (e) => {
    const tokenValue = localStorage.getItem("token");
    let token = JSON.parse(tokenValue);
    try {  
      e.preventDefault();
      await axios
        .post(
          IMGUPLAOD_URL,
          {
            title: title,
            description:description,
            base64: image.preview,
            
          },
          
          {
            headers: {
              authorization: token,
            },
          },
          
        )

        .then((res) => {
          console.log(res.data);
          navigate("/");
        });
    } catch (e) {
      console.log(e);
    }
  

  };

  const validator = () => {
    if (preview === null) {
      alert("قم باختيار الصور")
        handleSubmit();
      } 
    
  };

  //كتابة العنوان
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescirptionChange = (e) => {
    setDescription(e.target.value);
  }
  //رقع الصورة
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      
    };
    

    setEdit(true);
    setImage(img);
  };

  useEffect(() => {
    getImage();
  }, []);


  const getImage = async () => {
    setShowLoading(true);
    try {
      const tokenValue = localStorage.getItem("token");
      let token = JSON.parse(tokenValue);

      await axios
        .get(Get_Image_url + "/" + id,{
          headers: {
            authorization: token,
          },
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
      <ul className="list-navbar-img">
        <li className="list-item">
          <a class="shameless-plug" href="/">
            Home
          </a>
        </li>
      </ul>
      <h1 style={{ color: "white" }}>اختر صورة لعرضها في الصفحة الرئيسية</h1>
      {image.preview && <img src={image.preview} width="200" height="200" />}
      {edit ? (
        <form onSubmit={handleSubmit}>
          <div className="input-edit">
            <input
              type="text"
              value={title}
              placeholder="العنوان"
              onChange={handleTitleChange}
            ></input>
            <input
              type="text"
              value={description}
              placeholder="الوصف"
              onChange={handleDescirptionChange}
            ></input>
            <button type="submit">Submit</button>
          </div>
        </form>
      ) : (
        <form onSubmit={validator} className="form">
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

      {showLoading
        ? setShowLoading(false)
        : post && (
            <Grid container style={{ justifyContent: "center" }}>
              {post.data.map((img) => {
                return (
                  <>
                    <Card
                      sx={{ width: 345 }}
                      style={{ backgroundColor: "#fff0" }}
                    >
                      <CardMedia
                        sx={{ height: 230 }}
                        image={img.image}
                        title={img.title}
                      />
                  
                      <CardContent style={{ padding: "0px" }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          color={"#ffffffe6"}
                        >
                          {img.title}
                          
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          color={"#ffffffe6"}
                        >
                          {img.description}
                          
                        </Typography>
                        
                      </CardContent>
                      <CardActions>
                        <Link
                          to={`/edit-title/${img._id}`}
                          className="editTitle"
                        >
                          تعديل المنشور
                        </Link>
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
