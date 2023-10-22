import React, { useState } from "react";
import axios from "./config/axios";
import { Get_Image_url, IMGUPLAOD_URL } from "./config/urls";
import { useEffect } from "react";
import "./imageUpload.css";
import Navbar from "./Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function ImageUpload() {
  const [image, setImage] = useState("");
  const [allImage, setAllImage] = useState([]);
  const { setLoggedIn } = useContext(AuthContext);

  //localStorage.removeItem("token")
  /*
  const userData = localStorage.getItem("token");
  const pharseData = JSON.parse(userData)
  console.log(pharseData);
  */

  function covertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result); //base64encoded string
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }
  useEffect(() => {
    getImage();
  }, []);

  const uploadImage = async (req, res) => {
    try {
      const img = await axios
        .post(IMGUPLAOD_URL, {
          image: image,
        })
        .then((res) => {
          console.log(res.data);
        });
      body: JSON.stringify({
        base64: image,
      });
    } catch (e) {
      console.log(e);
    }
  };
  function getImage() {
    axios.get(Get_Image_url, {}).then(
      (res) =>
        (res.json = (data) => {
          console.log(data);
          setAllImage(data);
        })
    );
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="auth-wrapper">
        <div className="auth-inner" style={{ width: "auto" }}>
          Let's Upload Image
          <br />
          <input accept="image/*" type="file" onChange={covertToBase64} />
          <br />
          {image == "" || image == null ? (
            ""
          ) : (
            <img width={100} height={100} src={image} />
          )}
          <button onClick={uploadImage}>Upload</button>
          {allImage.map((data) => {
            return <img width={100} height={100} src={data.image} />;
          })}
        </div>
      </div>
    </>
  );
}
export default ImageUpload;
