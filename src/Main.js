import { useEffect, useState } from 'react';
import { Grid, Link } from '@mui/material';
import LikeButton from './components/LikeButton';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Navbar from './components/Navbar';
import axios from './config/axios';
import { Get_Image_url } from './config/urls';
import { useSwiperSlide } from 'swiper/react';


function Main()  {
  const [post,setPost] = useState();
  const [showLoading,setShowLoading] = useState(false);
  const swiperSlide = useSwiperSlide();


  useEffect(() => {
    getImage()
  },[]);

  
  const getImage = async () => {
    setShowLoading(true)
    try{
      const img = axios.get(Get_Image_url,{
        Image:Image
      }).then(res => {
        console.log(res);
        setPost(res.data)
        setShowLoading(false)
      })
    }catch(e){
      console.log(e);
      setShowLoading(false)
    }
  }

  


   
    
    return(
      <>
      <Navbar></Navbar>
      {showLoading 
      ?
      setShowLoading(false)
      :post &&
      <Grid container  >
      
                   
          {post.data.map(img => {
            return(
              <img key={Math.random()} src={img.image}
              alt="Hedy Lamarry"
              className="photo"
            />

            )
          
          })
          
        }
      </Grid>  
      }
    
    
      </>
    )
    
}

export default Main;