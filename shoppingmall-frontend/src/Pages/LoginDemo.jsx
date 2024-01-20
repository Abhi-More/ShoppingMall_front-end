import React from 'react'
import { Link } from 'react-router-dom'
import LoginPic from '../assets/images/signup-image.jpg'
import SignupDemo from './SignupDemo'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
const LoginDemo = () => {
    const [email, Setemail] = useState("");
    const [password, Setpassword] = useState("");
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault();
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
            // alert("login succefully !!");
            toast.success(" login successfully !!");
            navigate("/homepage");
        }else{
            navigate('/')
        }
    };
    return (
        <div>
            <div className="main">

                {/* Sing in  Form */}
                <section className="sign-in pt-5">
                    <div className="container">
                        <div className="signin-content">
                            <div className="signin-image">
                                <figure><img src={LoginPic} alt="sing up image" /></figure>
                                <Link to='/signup' className="signup-image-link">Don't have an account?</Link>
                            </div>
                            <div className="signin-form">
                                <h2 className="form-title">Login</h2>
                                <form method="POST" className="register-form" id="login-form">
                                    <div className="form-group">
                                        <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name" /></label>
                                        <input type="text" value={email}
                                            onChange={(e) => {
                                                Setemail(e.target.value);
                                            }}
                                            required name="email" id="email" placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="your_pass"><i className="zmdi zmdi-lock" /></label>
                                        <input type="password" name="your_pass" value={password}
                                            onChange={(e) => {
                                                Setpassword(e.target.value);
                                            }}
                                            required id="your_pass" placeholder="Password" />
                                    </div>

                                    <div className="form-group form-button">
                                        <input type="submit" name="signin" id="signin" className="form-submit" onClick={signIn} defaultValue="Log in" />
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default LoginDemo
