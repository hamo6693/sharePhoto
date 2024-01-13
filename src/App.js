import "./styles/App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import LogIn from "./components/login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Main from "./components/Main";
import Img from "./components/ImageUpload";
import REGISTER from "./components/SingUp";
import EditTitle from "./components/editTitle";

function App() {
  const { loggedIn } = useContext(AuthContext);

  console.log(loggedIn);
  return (
    <Routes>
      <Route path="/" element={<Main />} />

      {!loggedIn && (
        <>
          <Route path="/singup" element={<REGISTER />} />

          <Route path="/login" element={<LogIn />} />
        </>
      )}

      <Route path="/upload-image" element={<Img />} />


      <Route path="/edit-title/:id" element={<EditTitle />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
