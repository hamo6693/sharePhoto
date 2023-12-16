import React, { useContext } from "react";
import { useState } from "react";
import { Input } from "@mui/material";
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

function EditTitle() {
  const [title, setTitle] = useState("");
  const { jwt } = useContext(AuthContext);
  const id = window.location.pathname.split("/")[2];
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios
        .put(
          EDIT_TITLE + "/" + id,
          {
            title: title,
          },

          {
            headers: {
              authorization: jwt,
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
      await axios
        .get(EDIT_TITLE + "/" + id, {
          headers: {
            authorization: jwt,
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

  const handlerDelete = async (req, res) => {
    await axios
      .delete(IMGUPLAOD_URL + "/" + id, {
        headers: {
          authorization: jwt,
        },
        id: id,
      })
      .then((res) => {
        console.log("تم الحذف");
      });
  };

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
        </CardContent>
        <CardActions>
          <form onSubmit={handleSubmit}>
            <Input
              className="input-filed"
              type="text"
              placeholder="العنوان"
              onChange={handleTitleChange}
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
