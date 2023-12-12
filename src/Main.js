import { useEffect, useState } from "react";
import { Card, CardMedia, Grid,CardActions,Typography,CardContent } from "@mui/material";
import Navbar from "./components/Navbar";
import axios from "./config/axios";
import { Get_Image_url,Like } from "./config/urls";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function Main() {
  const [post, setPost] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const [title, setTitle] = useState("");;
  const [likes,setLikes] = useState(0)
  const [liked,setLiked] =useState(false)
  const id = useParams()

  

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
          console.log(res.data);
          setPost(res.data);
          setShowLoading(false);
        });
    } catch (e) {
      console.log(e);
      setShowLoading(false);
    }
  };


 function likePhoto  ()  {
  
    if (liked) {
      setLikes(likes - 1,);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);  
    }
  }

  


  const likePost = (id)=>{
    const tokenValue = localStorage.getItem("token");
    let token = JSON.parse(tokenValue);
    console.log(token);
    try{
      axios.put(Like  + "/" + id ,{user:id},{
        headers: {
          authorization: token,
        },
      
      
        
    }).then(res => {
     
      //رمز الصور
      console.log(id)
    

      console.log(res);
    })
    } catch(e){
      console.log(e);
    }
     
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
                      <Button 
                      
                      onClick={()=>likePost(img._id)}
                      
                      >
                        {post.data.map((img) => {
                          return(
                            <>
                            {img.likes._id}
                          </>
                          )
                        })}
                    <ThumbUpIcon/>
                    {img.likes.length + " likes"}
                   
                    </Button>
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


export default Main
