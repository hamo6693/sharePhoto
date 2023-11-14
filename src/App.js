import "./styles/App.css";
import Home from "./Home";
import {
  Route,
  Routes,
  Navigate,
  
} from "react-router-dom";
import LogIn from "./components/login";
//import ImageUpload from "./components/ImageUpload";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Main from "./Main";
import Img from "./components/ImageUpload";
import REGISTER from "./components/SingUp";

function App() {
  const { loggedIn } = useContext(AuthContext);

  console.log(loggedIn);  
  return (
    <Routes>

      {loggedIn && (
      <Route path="/" element={<Main />} />
      )}

      <Route path="/" element={<Home />} />

      {!loggedIn && (
      <Route path="/login" element={<LogIn />} />
      )}

      {!loggedIn && (
      <Route path="/singup" element={<REGISTER />} />
      )}

      
      <Route path="/upload-image" element={<Img />}  />
      

      

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
//<Route path="/upload-image" element={loggedIn ? <Navigate to="/" /> : <Img />}/>
//<Route path="/upload-image/:id" element={<Img />}  />

export default App;
