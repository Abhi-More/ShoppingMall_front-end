import React from "react";
import toast from 'react-hot-toast'
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import "../assets/css/login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const navigate = useNavigate();

  const signIn = () => {
    let isvalid = false;
    if (email === "" || password === "") {
      toast.error("Please fill all fields!");
    } else {
      if (email === "admin@admin.com" && password === "admin") {
        isvalid = true;
        let data = JSON.stringify({ email, password });
        console.log(data.email);
      } else {
        isvalid = false;
        toast.error(" Invalid credential !!");
      }
    }
    if (isvalid) {
      alert("login succefully !!");
      navigate("/profilePage");
    }
  };
  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col="12" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid "
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol col="12" md="6">
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3">Sign in</p>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0"></p>
          </div>
          <MDBInput
            className="rounded-4 hover-shadow"
            wrapperClass="mb-4"
            label="Email address"
            id="formControlLg"
            type="email"
            size="lg"
            value={email}
            onChange={(e) => {
              Setemail(e.target.value);
            }}
            required
          />
          <MDBInput
            className="rounded-4 hover-shadow"
            wrapperClass="mb-4"
            label="Password"
            id="formControlLg"
            type="password"
            size="lg"
            value={password}
            onChange={(e) => {
              Setpassword(e.target.value);
            }}
            required
          />

          <div className="d-flex justify-content-between mb-4">
            <a href="!#">Forgot password?</a>
          </div>

          <div className="text-center text-md-start mt-4 pt-2">
            <MDBBtn className="mb-0 px-5" size="lg" onClick={signIn}>
              Login
            </MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>

          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
