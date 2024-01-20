import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
// import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
// import { IconButton } from "@material-ui/core";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
    
      const getEmployee=async()=>{
        const data= await axios.get(`http://localhost:8080/employee/all`)
        setEmployees(data.data)
      }

      useEffect(()=>{
        getEmployee()
        
      },[])

  const [updateUserDetails, setUpdateUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    state: "",
    country: "",
  });
  const handleDelete = (id) => {
    // Filter out the employee with the specified id
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  const [EmpId, setEmpId] = useState("");
  const handleEdit = (id) => {
    setEmpId(id);
  };

  const AddNewEmp = () => {
    // Add the new user to the employees list
    setEmployees((prevEmployees) => [
      ...prevEmployees,
      {
        id: prevEmployees.length + 1,
        name: "",
        email: "",
        phNumber: "",
        position: "",
        address: "",
      },
    ]);
  };

  return (
    <>
    <Layout>
      <center className="pt-3">
        {" "}
        <button className="my-3 btn btn-outline-success" onClick={() => AddNewEmp()}>
          Add Employee
        </button>
        <table className="container w-75 mx-5 table table-hover my-3">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">FullName</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Designation</th>
              <th scope="col">Address</th>
              <th scope="col">Edit</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
          {/* {console.log(employees.data)} */}
            {employees.map((ele) => {
              return (
                <tr key={ele.empId}>
                {console.log(ele)}
                  <th scope="row">{ele.empId}</th>
                  <td>{ele.name}</td>
                  <td>{ele.email}</td>
                  <td>{ele.contactNo}</td>
                  <td>{ele.designation}</td>
                  {/* <td>{ele.dataOfJoining}</td> */}
                  <td>{ele.address}</td>
                  {/* <td>{ele.salary}</td> */}
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        handleEdit(ele.empId);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    {" "}
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(ele.empId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        
        </table>
      </center>
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
              <h5 className="modal-title" id="exampleModalLabel">
                Fill Details of EMP Id{EmpId}
              </h5>
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
                    placeholder="First name"
                    aria-label="First name"
                    name="firstName"
                    value={
                      !employees[EmpId - 1]
                        ? " "
                        : employees[EmpId - 1].name.split(" ")[0]
                    }
                    
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    aria-label="Last name"
                    name="lastName"
                    value={
                      !employees[EmpId - 1]
                        ? " "
                        : employees[EmpId - 1].name.split(" ")[1]
                    }
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
                    value={
                      !employees[EmpId - 1] ? " " : employees[EmpId - 1].email
                    }
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
                    name="phoneNumber"
                    value={
                      !employees[EmpId - 1]
                        ? " "
                        : employees[EmpId - 1].phNumber
                    }
                  />
                </div>
              </div>
              <div className="my-2 row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Position"
                    aria-label="First name"
                    name="phoneNumber"
                    value={
                      !employees[EmpId - 1]
                        ? " "
                        : employees[EmpId - 1].position
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    aria-label="First name"
                    name="city"
                    value={
                      !employees[EmpId - 1]
                        ? " "
                        : employees[EmpId - 1].address.split(",")[0]
                    }
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="State"
                    aria-label="Last name"
                    name="state"
                    value={
                      !employees[EmpId - 1]
                        ? " "
                        : employees[EmpId - 1].address.split(",")[1]
                    }
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="country"
                    aria-label="Last name"
                    name="country"
                    value={
                      !employees[EmpId - 1]
                        ? " "
                        : employees[EmpId - 1].address.split(",")[2]
                    }
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="mx-5 btn btn-primary"
                data-bs-dismiss="modal"
              
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      </Layout>
    </>
  );
};

export default EmployeeDetails;
