import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  Grid,
  CardActions,
  Typography,
  CardContent,
} from "@mui/material";
import Navbar from "./Navbar";
import axios from "../config/axios";
import {  Get_Image_url, Like } from "../config/urls";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";


function Main() {
  const [post, setPost] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const [likes, setLikes] = useState(0);
  const { loggedIn } = useContext(AuthContext);

  useEffect(() => {
    getImage();
    
  }, [likes]);

  const getImage = async () => {
    setShowLoading(true);
    try {
      const tokenValue = localStorage.getItem("token");
      let token = JSON.parse(tokenValue);
      
       await axios
        .get(Get_Image_url, {
          headers: {
            authorization: token,
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

  const likePost = (id) => {
    try {
      const tokenValue = localStorage.getItem("token");
      let token = JSON.parse(tokenValue);
      axios
        .put(
          Like + "/" + id,
          { user: id },
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then((res) => {
          setLikes(res);

          console.log(res);
        });
    } catch (e) {
      console.log(e);
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
                    <Card
                      sx={{ width: 345 }}
                      style={{ backgroundColor: "#fff0" }}
                      className="card"
                    >
                      <Link to={`/edit-title/${img._id}`}>
                      <CardMedia
                        sx={{ height: 230 }}
                        image={img.image}
                        title={img.title}
                      />
                      </Link>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          style={{ color: "#ffffffe6" }}
                        >
                          {img.title}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          style={{ color: "#ffffffe6" }}
                        >
                          {img.description}
                        </Typography>
                        
                      </CardContent>
                      <CardActions></CardActions>
                      <div style={{ display: "flex" }}>
                        {loggedIn ? (
                          <Button
                            onClick={() => likePost(img._id)}
                            style={{ color: "white" }}
                          >
                            {post.data.map((img) => {
                              return <>{img.likes._id}</>;
                            })}
                            <ThumbUpIcon
                              style={{ color: "white", padding: "3px" }}
                            />
                            {img.likes.length + " likes"}
                          </Button>
                        ) : (
                          ""
                        )}
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
