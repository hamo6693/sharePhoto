import React, { useContext, useEffect, useState } from "react";
import "../styles/navbar.css";
import { AuthContext } from "../context/authContext";
import { GETPROFILE } from "../config/urls";
import axios from "../config/axios";

import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

const Navbar = () => {
    const [nameUser, setNameUser ] = useState();
    const { loggedIn,setLoggedIn } = useContext(AuthContext);
    console.log(loggedIn);

    const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

    const logOut = async () => {
         window.localStorage.removeItem("token")
        setLoggedIn(false)
    }

    useEffect(() => {
        getProfile()
      },[])
    
      const getProfile = async () => {
        try {
          const tokenValue = localStorage.getItem("token");
          let token = JSON.parse(tokenValue);
           await axios
            .get(GETPROFILE, {
              headers: {
                authorization: token,
              },
    
              Image: Image,
            })
            .then((res) => {
              console.log(res.data);
              setNameUser(res.data);
              setLoggedIn(true)
            });
        } catch (e) {
          console.log(e);
        }
      };
   

  return (
    <>
  
    {loggedIn ?
    
    <ul className="list-navbar">
	<li className="list-item">
    <a class="shameless-plug" href="/">
        Home
    </a>
    </li>
	<li className="list-item">
    <a class="shameless-plug" href="/upload-image">
    UPLOAD
    </a>
    </li>

  
    
    <Stack direction="row" spacing={2} style={{marginTop:"11px"}}>
     
     <div>
       <Button
         ref={anchorRef}
         id="composition-button"
         aria-controls={open ? 'composition-menu' : undefined}
         aria-expanded={open ? 'true' : undefined}
         aria-haspopup="true"
         onClick={handleToggle}
        
       >
          <div  className="shameless-plug" style={{fontSize:"1rem"}}>{nameUser}</div>
       </Button>
       <Popper
         open={open}
         anchorEl={anchorRef.current}
         role={undefined}
         placement="bottom-start"
         transition
         disablePortal
       >
         {({ TransitionProps, placement }) => (
           <Grow
             {...TransitionProps}
             style={{
               transformOrigin:
                 placement === 'bottom-start' ? 'left top' : 'left bottom',
             }}
           >
             <Paper>
               <ClickAwayListener onClickAway={handleClose}>
                 <MenuList
                   autoFocusItem={open}
                   id="composition-menu"
                   aria-labelledby="composition-button"
                   onKeyDown={handleListKeyDown}
                 >
                   <MenuItem onClick={handleClose}>Profile</MenuItem>
                   <MenuItem onClick={logOut}>Logout</MenuItem>
                 </MenuList>
               </ClickAwayListener>
             </Paper>
           </Grow>
         )}
       </Popper>
     </div>
   </Stack>
    
    

    
    </ul>
    : 
    <ul className="list-navbar" >
    <li className="list-item">
    <a class="shameless-plug" href="/">
        Home
    </a>
    </li>
    <li className="list-item">
    <a class="shameless-plug" href="/singup">
    REGISTER
    </a>
    </li>
    <a class="shameless-plug" href="/login">
	<li className="list-item">
    LOGIN 
    </li>
    </a>
    </ul> 
    
    }
    

  </>
  )
}

export default Navbar