import { useContext, useEffect, useState } from "react";
import { Card, CardMedia, Grid,CardActions,Typography,CardContent } from "@mui/material";
import Navbar from "./components/Navbar";
import axios from "./config/axios";
import { Get_Image_url, LIKE_URL } from "./config/urls";
import { AuthContext } from "./context/authContext";
import { FactCheck,HeartBroken } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function Main() {
  const [post, setPost] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const [title, setTitle] = useState("");;
  const [likes,setLikes] = useState(0)
  const [liked,setLiked] =useState(false)
  const id = useParams()
  const [data,setData] = useState([])

  
  /*const {jwt} = useContext(AuthContext)*/

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    setShowLoading(true);
    try {
      const tokenValue = localStorage.getItem("token");
      let token = JSON.parse(tokenValue);
      console.log(token);

      const img = axios.get(Get_Image_url, {
          
        headers:{
          authorization:token
        },
        
          Image: Image,
        })
        .then((res) => {
          console.log(res.data.data);
          setPost(res.data);
          setShowLoading(false);
        });
    } catch (e) {
      console.log(e);
      setShowLoading(false);
    }
  };


 const likePhoto = () => {
  console.log("d");
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);  
    }
  }

  const likePost = (id)=>{
    fetch('/like',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId:id
        })
    }).then(res=>res.json())
    .then(result=>{
             //   console.log(result)
      const newData = data.map(item=>{
          if(item._id==result._id){
              return result
          }else{
              return item
          }
      })
      setData(newData)
    }).catch(err=>{
        console.log(err)
    })
}


  return (
    <>
      <Navbar></Navbar>
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
                      </CardActions>
                      <div style={{display:"flex"}}>
                      <Button onClick={()=>likePhoto()} >
                    <ThumbUpIcon/>
                    </Button>
                    <h3>{img.likes.length} likes</h3>
                    </div>
                    </Card>
                    
                   
                    
                  </>
                );
              })}
            </Grid>
          )}
    </>
  );
}

export default Main;
