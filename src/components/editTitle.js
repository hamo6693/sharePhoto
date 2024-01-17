import React, { useContext } from "react";
import { useState } from "react";
import { Input, styled } from "@mui/material";
import axios from "../config/axios";
import { EDIT_TITLE, IMGUPLAOD_URL } from "../config/urls";
import { AuthContext } from "../context/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CloudUpload } from "@mui/icons-material";


function EditTitle() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(null);

  const { jwt } = useContext(AuthContext);
  const id = window.location.pathname.split("/")[2];
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const tokenValue = localStorage.getItem("token");
    let token = JSON.parse(tokenValue);
    try {
      e.preventDefault();
      await axios
        .put(
          EDIT_TITLE + "/" + id,
          {
            title: title,
            description:description,
            base64: image.preview,
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
  const handleDesciptionChange = (e) => {
    setDescription(e.target.value);
    console.log(description);
  };
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
    };
    setImage(img)
  }
  

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    const tokenValue = localStorage.getItem("token");
    let token = JSON.parse(tokenValue);
    try {
      await axios
        .get(EDIT_TITLE + "/" + id, {
          headers: {
            authorization: token,
          },
          title: title,
          description:description
        })
        .then((res) => {
          setTitle(res.data.data.title);
          setImage(res.data.data.image);
          setDescription(res.data.data.description);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handlerDelete = async (req, res) => {
    const tokenValue = localStorage.getItem("token");
    let token = JSON.parse(tokenValue);
    await axios
      .delete(IMGUPLAOD_URL + "/" + id, {
        headers: {
          authorization: token,
        },
        id: id,
      })
      .then((res) => {
        console.log("تم الحذف");
      });
  };
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  
  return (
    <>
      <h1 style={{ marginBottom: "15px", color: "white", textAlign: "center" }}>
        تعديل العنوان
      </h1>
      <Card sx={{ width: 345 }}>
        <CardMedia sx={{ height: 140 }} image={image} title={title} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color={"blueviolet"}
            fontWeight={"600"}
            textAlign={"center"}
          >
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color={"blueviolet"}
            fontWeight={"600"}
            textAlign={"center"}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <form onSubmit={handleSubmit}>
          {image.preview && <img src={image.preview} width="200" height="200" />}
          <Button component="label" variant="contained" startIcon={<CloudUpload />} style={{display:"flex"}} alt={image.title} onChange={handleFileChange}>
      Upload file
      <VisuallyHiddenInput type="file" />
      </Button>
            <Input
              className="input-filed"
              type="text"
              placeholder="العنوان"
              onChange={handleTitleChange}
            ></Input>
             <Input
              className="input-filed"
              type="text"
              placeholder="الوصف"
              onChange={handleDesciptionChange}
            ></Input>
            <Button
              type="submit"
              variant="contained"
              style={{ marginRight: "1px" }}
            >
              تعديل
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="error"
              onClick={() => {
                handlerDelete();
              }}
            >
              حذف
            </Button>
          </form>
        </CardActions>
      </Card>
    </>
  );
}
export default EditTitle;
