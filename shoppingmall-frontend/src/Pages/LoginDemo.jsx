import { Link } from "react-router-dom";
import LoginPic from "../assets/images/signup-image.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios'
import {jwtDecode} from 'jwt-decode';
import {useInfo} from "../ContextApi/ContextApi"
const LoginDemo = () => {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const navigate = useNavigate();
  const [user,setUser]=useInfo()

  const signIn = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username: email,
        password: password,
      });

      // Assuming your backend returns a success status or some data indicating success
      if (response.status === 200) {
        toast.success("Login successful!!")
        // console.log("token ----- ",response.data)
        const token = response.data
        console.log("here-----------")
        const decodedToken = jwtDecode(token);
        // const userId = decodedToken.id;
        // const userEmail = decodedToken.name;
        console.log("decoded----- ", decodedToken)

        console.log("id ----", decodedToken.id)
        console.log("email ----", decodedToken.sub)
        setUser([decodedToken,response.data])
        // console.log(response.data);
        // setUserId(decodedToken.id);
        navigate("/homepage");
      } else {
        toast.error("Login failed. Please check your credentials.");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      toast.error("Invalid credential");
      navigate("/");
    }

    

  };
  useEffect(()=>{
    console.log(user);
  },[])
  return (
    <div>
      <div className="main">
        {/* Sing in  Form */}
        <section className="sign-in pt-5">
          <div className="container">
            <div className="signin-content">
              <div className="signin-image">
                <figure>
                  <img src={LoginPic} alt="sing up image" />
                </figure>
                <Link to="/signup" className="signup-image-link">
                  Don't have an account?
                </Link>
              </div>
              <div className="signin-form">
                <h2 className="form-title">Login</h2>
                <form method="POST" className="register-form" id="login-form">
                  <div className="form-group">
                    <label htmlFor="your_name">
                      <i className="zmdi zmdi-account material-icons-name" />
                    </label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => {
                        Setemail(e.target.value);
                      }}
                      required
                      name="email"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="your_pass">
                      <i className="zmdi zmdi-lock" />
                    </label>
                    <input
                      type="password"
                      name="your_pass"
                      value={password}
                      onChange={(e) => {
                        Setpassword(e.target.value);
                      }}
                      required
                      id="your_pass"
                      placeholder="Password"
                    />
                  </div>

                  <div className="form-group form-button">
                    <input
                      type="submit"
                      name="signin"
                      id="signin"
                      className="form-submit"
                      onClick={signIn}
                      defaultValue="Log in"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginDemo;
