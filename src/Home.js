import { useContext, useEffect, useState } from "react";
import { Card, CardMedia, Grid,CardActions,Typography,CardContent } from "@mui/material";
import Navbar from "./components/Navbar";
import axios from "./config/axios";
import { Get_Image_url, LIKE_URL, Like } from "./config/urls";
import { AuthContext } from "./context/authContext";
import { FactCheck,HeartBroken } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function Home() {
  const [post, setPost] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const [title, setTitle] = useState("");;
  const [likes,setLikes] = useState(0)
  const [liked,setLiked] =useState(false)
  const id = useParams()

  
  /*const {jwt} = useContext(AuthContext)*/

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    setShowLoading(true);
    try {
      
    

      const img = axios.get(Get_Image_url, {
          
      
        
          Image: Image,
        })
        .then((res) => {
          console.log(res.data);
          setPost(res.data);
          setShowLoading(false);
        });
    } catch (e) {
      console.log(e);
      setShowLoading(false);
    }
  };


 

  


 


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
                     
                    
                    </Card>
                    
                   
                    
                  </>
                );
              })}
            </Grid>
          )}
    </>
  );
}


export default Home
