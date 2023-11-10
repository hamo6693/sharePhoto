import React, { useContext } from "react";
import { useState } from "react";
import axios from "../config/axios";
import { IMGUPLAOD_URL } from "../config/urls";
import Navbar from "./Navbar";
import { AuthContext } from "../context/authContext";
//import { useEffect } from "react";

function Img() {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  //const {setLoggedIn,setJwt} = useContext(AuthContext)
  const { jwt } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await axios
        .post(IMGUPLAOD_URL, setImage, {
          headers: {
            authorization: jwt,
          },
          base64: image.preview,
        })
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
    </div>
  );
}
export default Img;
