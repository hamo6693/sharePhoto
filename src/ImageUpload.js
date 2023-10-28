import React from "react"
import { useState } from "react"
import axios from "./config/axios";
import { IMGUPLAOD_URL } from './config/urls';
import Navbar from "./Navbar";

function Img() {
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    //let formData = new FormData()
    //formData.append('file', image.data)
    const response = await axios.post(IMGUPLAOD_URL, {
      base64: image.preview,
    })
    console.log(image);
    if (response) setStatus(response.statusText)
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }
  return (
    <div className='App'>
      <Navbar></Navbar>
      <h1>Upload to server</h1>
      {image.preview && <img src={image.preview} width='100' height='100' />}
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input accept="image/" type='file' name='file' onChange={handleFileChange}></input>
        <button type='submit'>Submit</button>
      </form>
      {status && <h4>تم ارسال الصورة</h4>}
    </div>
  )

}
export default Img