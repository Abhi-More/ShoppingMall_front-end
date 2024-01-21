import Layout from "../Layout/Layout";
import React, { useState } from 'react';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeEmail: '',
    employeePhoneno: '',
    employeeSalary: '',
    employeeDesignation: '',
    employeeJoiningDate: '',
    employeeAddress: '',
  });

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Employee Details saved Successfully:', formData);
  };

  return (
    <Layout>
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h3>Employee Form</h3>
        <div className="mb-3">
          {/* <label htmlFor="employeeName" className="form-label">Employee Name</label> */}
          <input
            type="text"
            className="form-control"
            id="employeeName"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleInputChange}
            placeholder="Enter employee name"
          />
        </div>
      
        <div className="mb-3">
          {/* <label htmlFor="employeeEmail" className="form-label">Employee Email</label> */}
          <input
            type="email"
            className="form-control"
            id="employeeEmail"
            name="employeeEmail"
            value={formData.employeeEmail}
            onChange={handleInputChange}
            placeholder="Enter employee email"
          />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="employeeName" className="form-label">Employee Phone no</label> */}
          <input
            type="tel"
            className="form-control"
            id="employeePhoneno"
            name="employeePhoneno"
            value={formData.employeePhoneno}
            onChange={handleInputChange}
            placeholder="Enter employee Phone no"
          />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="employeeSalary" className="form-label">Salary</label> */}
          <input
            type="number"
            className="form-control"
            id="employeeSalary"
            name="employeeSalary"
            value={formData.employeeSalary}
            onChange={handleInputChange}
            placeholder="Enter employee salary"
          />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="employeeDesignation" className="form-label">Designation</label> */}
          <input
            type="text"
            className="form-control"
            id="employeeDesignation"
            name="employeeDesignation"
            value={formData.employeeDesignation}
            onChange={handleInputChange}
            placeholder="Enter employee designation"
          />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="employeeJoiningDate" className="form-label">Date of Joining</label> */}
          <input
            type="date"
            className="form-control"
            id="employeeJoiningDate"
            name="employeeJoiningDate"
            value={formData.employeeJoiningDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="employeeAddress" className="form-label">Address</label> */}
          <input
            type="text"
            className="form-control"
            id="employeeAddress"
            name="employeeAddress"
            value={formData.employeeAddress}
            onChange={handleInputChange}
            placeholder="Enter employee address"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-center">
          Submit
        </button>
      </form>
    </div>
    </Layout>
  );
};

export default AddEmployee;
