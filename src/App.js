import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import SingUp from "./SingUp";
import LogIn from "./login";
import ImageUpload from "./ImageUpload";
import Navbar from "./Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Main from "./Main";

function App() {
  const { loggedIn } = useContext(AuthContext);

  console.log(loggedIn);
  
  return (
    <Routes>
      {!loggedIn && (
      <Route path="/" element={<Home />} />
      )}
      {loggedIn && (
      <Route path="/" element={<Main />} />
      )}

      {!loggedIn && (
      <Route path="/login" element={<LogIn />} />
      )}
      
      {!loggedIn && (
      <Route path="/singup" element={<SingUp />} />
      )}

      
      <Route path="/upload-image" element={<ImageUpload/>}  />
      

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
