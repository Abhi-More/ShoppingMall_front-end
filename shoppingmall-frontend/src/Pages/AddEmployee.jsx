import Layout from "../Layout/Layout";
import React, { useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

const AddEmployee = () => {
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
        .post("http://localhost:8080/employee", formData)
        .then((res) => {
          console.log("res status",res.status)
          if (res.status === 201) {
            toast.success("Employee Added");
          } 
        })
        .catch((error) => {
          toast.error("Try using different email");
        });
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h3 style={{textAlign:"center"}}>Employee Form</h3>
        <div className="mb-3">
          {/* <label htmlFor="name" className="form-label">Employee Name</label> */}
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
          {/* <label htmlFor="email" className="form-label">Employee Email</label> */}
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
          {/* <label htmlFor="name" className="form-label">Employee Phone no</label> */}
          <input
            type="tel"
            className="form-control"
            id="contactNo"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleInputChange}
            placeholder="Employee Phone no"
          />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="salary" className="form-label">Salary</label> */}
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
          {/* <label htmlFor="designation" className="form-label">Designation</label> */}
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
          {/* <label htmlFor="dateOfJoining" className="form-label">Date of Joining</label> */}
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
          {/* <label htmlFor="address" className="form-label">Address</label> */}
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
        <button
          type="submit"
          className="btn btn-primary btn-center"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </Layout>
  );
};

export default AddEmployee;
