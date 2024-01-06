import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import "../assets/css/signup.css";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [retypepass, setretypepass] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const signupMe = () => {
    let isvalid = false;
    if (
      (username === "") | (email === "") ||
      (password === "") | (retypepass === "")
    ) {
      toast.error("Please fill all fields!");
    } else {
      if (password !== retypepass) {
        // alert("Password does not match Retype Password!", password, retypepass);
        toast.error("Password does not match Retype Password!");
        isvalid = false;
      } else {
        let data = JSON.stringify({ username, email, password });
        isvalid = true;
        console.log(data);
      }
    }
    console.log(isvalid);
    if (isvalid) {
      // alert("signup succefully login please !!");
      toast.success("signup succefully login please !!");
      navigate("/");
    }
  };
  return (
    <>
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBDropdown
                    onClose={(e) => {
                      setRole(e.target.innerHTML);
                    }}
                  >
                    <MDBDropdownToggle>Select Role</MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link>Owner</MDBDropdownItem>
                      <MDBDropdownItem link>Admin</MDBDropdownItem>
                      <MDBDropdownItem link>Customer</MDBDropdownItem>
                      <MDBDropdownItem link>Employee</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </div>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Your Name"
                    id="form1"
                    type="text"
                    className="w-100 rounded-4 hover-shadow"
                    value={username}
                    onChange={(e) => {
                      setusername(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Your Email"
                    id="form2"
                    type="email"
                    className="rounded-4 hover-shadow"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    id="form3"
                    type="password"
                    className="rounded-4 hover-shadow"
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size="lg" />
                  <MDBInput
                    className="rounded-4 hover-shadow"
                    label="Repeat Your Password"
                    id="form4"
                    type="password"
                    value={retypepass}
                    onChange={(e) => {
                      setretypepass(e.target.value);
                    }}
                  />
                </div>
                <MDBBtn className="mb-4" size="lg" onClick={signupMe}>
                  Register
                </MDBBtn>{" "}
                Already have an account ?{" "}
                <Link to="/">
                  <b>Login</b>
                </Link>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage
                  className="img-fluid rounded-4 hover-shadow bg-image hover-zoom"
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  fluid
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};
export default Signup;
