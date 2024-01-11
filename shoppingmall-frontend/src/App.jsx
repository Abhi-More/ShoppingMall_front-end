import { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from 'react-hot-toast'
import AppContext from "./ContextApi/CreateContextApi";
import ProfilePage from "./Pages/ProfilePage";
import SignupDemo from "./Pages/SignupDemo";
import LoginDemo from "./Pages/LoginDemo";

function App() {
  const data = useContext(AppContext);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginDemo />} />
          <Route exact path="/profilePage" element={<ProfilePage />} />
          <Route exact path="/signup" element={<SignupDemo />} />
        </Routes>
      </Router>
      <Toaster/>
    </>
  );
}

export default App;
