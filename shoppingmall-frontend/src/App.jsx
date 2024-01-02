import { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from 'react-hot-toast'
import AppContext from "./ContextApi/CreateContextApi";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  const data = useContext(AppContext);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/profilePage" element={<ProfilePage />} />
        </Routes>
      </Router>
      <Toaster/>
    </>
  );
}

export default App;
