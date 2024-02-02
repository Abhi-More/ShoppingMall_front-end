import { Link } from "react-router-dom";
import "../assets/css/profilePage.css";
import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { useCartCount } from "../ContextApi/Cart";
import { useInfo } from "../ContextApi/ContextApi";
const ProfilePage = () => {
  const [userId, setuserId] = useState();
  const cart = useCartCount();
  const [user, setUser] = useInfo([]);
  const [gender, setGender] = useState("MALE");

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    contactNo: "",
    address: "",
  });

  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    contactNo: "",
    address: "",
  });
  const getSingleUser = async () => {
    const data = await axios.get(`http://localhost:8080/user/${user[0].id}`, {
      headers: {
        Authorization: `Bearer ${user[1]}`,
      },

      withCredentials: false,
    });
    setGender(data.data.gender);

    setUserDetails({
      name: data.data.name,
      email: data.data.email,
      contactNo: data.data.contactNo,
      address: data.data.address,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateUserDetails((prevupdateUserDetails) => ({
      ...prevupdateUserDetails,
      [name]: value,
    }));
  };
  const editUser = () => {
    setUpdateUserDetails({
      name: userDetails.name,
      email: userDetails.email,
      contactNo: userDetails.contactNo,
      address: userDetails.address,
    });
  };
  const handleSubmit = async () => {
    const newUpdateUser = {
      name: updateUserDetails.name,
      email: updateUserDetails.email,
      contactNo: updateUserDetails.contactNo,
      address: updateUserDetails.address,
    };
    await axios.put(`http://localhost:8080/user/${user[0].id}`, newUpdateUser, {
      headers: {
        Authorization: `Bearer ${user[1]}`,
      },

      withCredentials: false,
    });
    getSingleUser();
  };

  const clearUserDetails = () => {
    setUpdateUserDetails({
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
    });
  };
  useEffect(() => {
    getSingleUser();
  }, [userDetails]);
  return (
    <>
      <Layout title={"Profile Page"}>
        <div>
          <div className="container mt-3">
            <div className="main-body">
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb" className="main-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    User Profile
                  </li>
                </ol>
              </nav>
              {/* /Breadcrumb */}
              <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          src={`https://bootdey.com/img/Content/avatar/avatar${
                            gender === "FEMALE" ? 3 : 7
                          }.png`}
                          alt="Admin"
                          className="rounded-circle"
                          width={150}
                        />
                        <div className="mt-3">
                          <h4>{userDetails.name}</h4>
                          <p className="text-secondary mb-1">
                            {userDetails.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-3">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <h6 className="mb-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-globe mr-2 icon-inline"
                          >
                            <circle cx={12} cy={12} r={10} />
                            <line x1={2} y1={12} x2={22} y2={12} />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          </svg>
                          Website
                        </h6>
                        <span className="text-secondary">
                          https://bootdey.com
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <h6 className="mb-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-github mr-2 icon-inline"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                          </svg>
                          Github
                        </h6>
                        <span className="text-secondary">bootdey</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <h6 className="mb-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-twitter mr-2 icon-inline text-info"
                          >
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                          </svg>
                          Twitter
                        </h6>
                        <span className="text-secondary">@bootdey</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <h6 className="mb-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-instagram mr-2 icon-inline text-danger"
                          >
                            <rect
                              x={2}
                              y={2}
                              width={20}
                              height={20}
                              rx={5}
                              ry={5}
                            />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                          Instagram
                        </h6>
                        <span className="text-secondary">bootdey</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <h6 className="mb-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-facebook mr-2 icon-inline text-primary"
                          >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                          </svg>
                          Facebook
                        </h6>
                        <span className="text-secondary">bootdey</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Full Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {userDetails.name}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Email</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {userDetails.email}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Phone</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {userDetails.contactNo}
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Address</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {userDetails.address}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-12">
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={editUser}
                          >
                            Complete Profile
                          </button>
                        </div>
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1
                                  className="modal-title fs-5"
                                  id="exampleModalLabel"
                                >
                                  Fill User Details...
                                </h1>

                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>

                              <div className="modal-body">
                                <div className="row">
                                  <div className="col">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Full name"
                                      aria-label="First name"
                                      name="name"
                                      value={updateUserDetails.name}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
                                <div className="my-2 row">
                                  <div className="col">
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="Email"
                                      aria-label="First name"
                                      name="email"
                                      value={updateUserDetails.email}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
                                <div className="my-2 row">
                                  <div className="col">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Phone number"
                                      aria-label="First name"
                                      name="contactNo"
                                      value={updateUserDetails.contactNo}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Address"
                                      aria-label="First name"
                                      name="address"
                                      value={updateUserDetails.address}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  onClick={clearUserDetails}
                                >
                                  clear
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={handleSubmit}
                                  data-bs-dismiss="modal"
                                >
                                  Save changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default ProfilePage;
