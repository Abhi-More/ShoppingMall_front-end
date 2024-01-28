import "../assets/css/login1.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SigninPic from "../assets/images/signin-image.jpg";
import toast from "react-hot-toast";
import axios from 'axios'
const SignupDemo = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [retypepass, setretypepass] = useState("");
  const [role, setRole] = useState("");
  const [isGenderSelected, setisGenderSelected] = useState(false);
  const [gender, setGender] = useState("Gender");
  const navigate = useNavigate();

  const signupMe = (e) => {
    e.preventDefault()
    let isvalid = false;
    if (
      (username === "") | (email === "") ||
      (password === "") | (retypepass === "")
    ) {
      toast.error("Please fill all fields!");
    } else {
      if (password !== retypepass) {

        toast.error("Password does not match Retype Password!");
        isvalid = false;
      } else {

        // let data = JSON.stringify({ username, email, password });
        let data = axios.post('http://localhost:8080/auth/register', {
          name: username,
          email: email,
          password: password,
          gender: gender,
          role: "USER"
        })
        console.log(data);
        isvalid = true;
      }
    }
    if (isvalid) {
      toast.success("Signup successfully login please !!");
      navigate("/");
    }
  };


  return (
    <div>
      <div className="main">
        <section className="signup">
          <div className="container">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>

                {/* <form
                  method="POST"
                  className="register-form"
                  id="register-form"
                > */}
                <div className="dropdown mb-3">
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <button
                      className="dropdown-item"
                      onClick={() => setRole("employee")}
                    >
                      Employee
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => setRole("customer")}
                    >
                      Customer
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account material-icons-name" />
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setusername(e.target.value);
                    }}
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email" />
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pass">
                    <i className="zmdi zmdi-lock" />
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    name="pass"
                    id="pass"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="re-pass">
                    <i className="zmdi zmdi-lock-outline" />
                  </label>
                  <input
                    type="password"
                    value={retypepass}
                    onChange={(e) => {
                      setretypepass(e.target.value);
                    }}
                    name="re_pass"
                    id="re_pass"
                    placeholder="Repeat your password"
                    required
                  />
                </div>
                <div className="btn-group">
                  <button
                    className={`btn-sm dropdown-toggle btn btn-light ms-1 btn-outline-dark m-1 ${isGenderSelected ? "selected" : "not-selected"
                      }`}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {gender}
                  </button>
                  <ul className="dropdown-menu" required>
                    <div>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            setGender("MALE");
                            setisGenderSelected(true);
                          }}
                        >
                          MALE
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            setGender("FEMALE");
                            setisGenderSelected(true);
                          }}
                        >
                          FEMALE
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            setGender("OTHER");
                            setisGenderSelected(true);
                          }}
                        >
                          OTHER
                        </button>
                      </li>
                    </div>
                  </ul>
                </div>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    onClick={signupMe}
                    name="signup"
                    id="signup"
                    className="form-submit"
                    defaultValue="Register"
                  />
                </div>
                {/* </form> */}
              </div>
              <div className="signup-image">
                <figure>
                  <img src={SigninPic} alt="sing up image" />
                </figure>
                <a href="/" className="signup-image-link">
                  I am already member
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignupDemo;
