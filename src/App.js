import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import RequireAuth from "./RequireAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingUp from "./SingUp";
import LogIn from "./login";

import AuthContextProvider from "./context/AuthProvider";
import ImageUpload from "./ImageUpload";
import Protected from "./Protected";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/singup" element={<SingUp />} />

        <Route
          path="/upload-image"
          element={
            <Protected>
              <ImageUpload />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
