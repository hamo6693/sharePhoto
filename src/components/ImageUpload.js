import React, { useContext } from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import axios from "../config/axios";
import { IMGUPLAOD_URL } from "../config/urls";
import Navbar from "./Navbar";
import { AuthContext } from "../context/authContext";
import { Get_Image_url } from "../config/urls";
import { useEffect } from "react";

function Img() {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  //const {setLoggedIn,setJwt} = useContext(AuthContext)
  const { jwt } = useContext(AuthContext);
  const id = window.location.pathname.split("/")[1];

  //
  const [post, setPost] = useState();
  const [showLoading, setShowLoading] = useState(false);

  

 

  const handleSubmit = async (e) => {
    try {
      const tokenValue = localStorage.getItem("token")
      let token = JSON.parse(tokenValue)
      console.log(token);

      e.preventDefault();

      const response = await axios
        .post(
          IMGUPLAOD_URL,
          { base64: image.preview },
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          //setLoggedIn(true)
          //setJwt(true)
        });
    } catch (e) {
      console.log(e);
    }

    console.log(image);
    console.log(jwt);
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    setImage(img);
  };

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    setShowLoading(true);
    try {
      const tokenValue = localStorage.getItem("token")
      let token = JSON.parse(tokenValue)
      console.log(token);


      const img = axios
        .get(Get_Image_url + "/" + id, {
          headers: {
            authorization:token,
          },
          //image:image
        })
        .then((res) => {
          console.log(res);
          setPost(res.data);
          setShowLoading(false);
        });
    } catch (e) {
      console.log(e);
      setShowLoading(false);
    }
  };

  return (
    <div className="App">
      <Navbar></Navbar>
      <h1>Upload to server</h1>
      {image.preview && <img src={image.preview} width="100" height="100" />}
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input
          accept="image/"
          type="file"
          name="file"
          onChange={handleFileChange}
        ></input>
        <button type="submit">Submit</button>
      </form>
      {status && <h4>تم ارسال الصورة</h4>}
      <hr />
      {showLoading
        ? setShowLoading(false)
        : post && (
            <Grid container>
              {post.data.map((img) => {
                return (
                  <img
                    key={Math.random()}
                    src={img.image}
                    alt="Hedy Lamarry"
                    className="photo"
                  />
                );
              })}
            </Grid>
          )}
    </div>
  );
}
export default Img;
