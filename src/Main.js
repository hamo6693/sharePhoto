import { useContext, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Navbar from './components/Navbar';
import axios from './config/axios';
import { Get_Image_url } from './config/urls';
import { AuthContext } from './context/authContext';


function Main()  {
  const [post,setPost] = useState();
  const [showLoading,setShowLoading] = useState(false);
  const [title, setTitle] = useState("");

  /*const {jwt} = useContext(AuthContext)*/


  useEffect(() => {
    getImage()
  },[])

  
  const getImage = async () => {
    setShowLoading(true)
    try{
      const img = axios.get(Get_Image_url,{
        /*
        headers:{
          authorization:jwt
        },
        */
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
              <>
            

              <img key={Math.random()} src={img.image}
              className="photo"
            />
            <div className='title'>{img.title}</div>
            </>
            )
          
          })
          
        }
      </Grid>  
      }
    
    
      </>
    )
    
}

export default Main;