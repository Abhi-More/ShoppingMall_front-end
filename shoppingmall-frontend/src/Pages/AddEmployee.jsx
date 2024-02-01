import Layout from "../Layout/Layout";
import React, { useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useInfo } from "../ContextApi/ContextApi";
import { useNavigate } from "react-router-dom";
const AddEmployee = () => {
  const [user,setUser]=useInfo()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    salary: "",
    designation: "",
    dateOfJoining: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      (formData.name === "") |
      (formData.email === "") |
      (formData.contactNo === "") |
      (formData.salary === "") |
      (formData.address === "") |
      (formData.dateOfJoining === "") |
      (formData.designation === "")
    ) {
      toast.error("Please fill all fields!");
    } else {
      const response = await axios
        .post("http://localhost:8080/employee", formData,
        {
          headers: {
            Authorization: `Bearer ${user[1]}`,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            toast.success("Employee Added");
            navigate('/employee')
          }
        })
        .catch((error) => {
          toast.error("Try using different email");
        });
    }
  };

  return (
    <Layout>
      <div
        className="container mt-5 py-3"
        style={{ width: "850px", padding: "0px 50px", background: "rgb(234 234 234)"}}
      >
        <h3 className="mb-3" style={{ textAlign: "center" }}>Fill Employee Details</h3>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Employee name"
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Employee email"
          />
        </div>
        <div className="mb-3">
          <input
            type="tel"
            className="form-control"
            id="contactNo"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleInputChange}
            placeholder="Employee phone no"
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            placeholder="Employee salary"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            placeholder="Employee designation"
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            id="dateOfJoining"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Employee address"
          />
        </div>
        <center>
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </center>
      </div>
    </Layout>
  );
};

export default AddEmployee;
