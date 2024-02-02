import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { MdPersonAddAlt1 } from "react-icons/md";
import { useInfo } from "../ContextApi/ContextApi";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [user, setUser] = useInfo([]);

  const navigate = useNavigate();

  const [updateUserDetails, setUpdateUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    Designation: "",
    salary: "",
    city: "",
    state: "",
    country: "",
  });
  const getEmployees = async () => {
    const data = await axios.get(`http://localhost:8080/employee/all`, {
      headers: {
        Authorization: `Bearer ${user[1]}`,
      },

      withCredentials: false,
    });
    setEmployees(data.data);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateUserDetails((prevupdateUserDetails) => ({
      ...prevupdateUserDetails,
      [name]: value,
    }));
  };

  const [EmpId, setEmpId] = useState("");
  const [dob, setdob] = useState();

  const handleEdit = async (id) => {
    setEmpId(id);
    const { data } = await axios.get(`http://localhost:8080/employee/${id}`, {
      headers: {
        Authorization: `Bearer ${user[1]}`,
      },

      withCredentials: false,
    });
    setUpdateUserDetails({
      firstName: data.name.split(" ")[0],
      lastName: data.name.split(" ")[1],
      email: data.email,
      phoneNumber: data.contactNo,
      Designation: data.designation,
      salary: data.salary,
      city: data.address.split(" ")[0],
      state: data.address.split(" ")[1],
      country: data.address.split(" ")[1],
    });
    setdob(data.dateOfJoining);
  };

  const handleSubmit = async () => {
    const newUpdateUser = {
      name: updateUserDetails.firstName + " " + updateUserDetails.lastName,
      email: updateUserDetails.email,
      contactNo: updateUserDetails.phoneNumber,
      address:
        updateUserDetails.city +
        ", " +
        updateUserDetails.state +
        ", " +
        updateUserDetails.country,
      designation: updateUserDetails.Designation,
      salary: updateUserDetails.salary,
      dateOfJoining: dob,
    };
    console.log({ newUpdateUser });
    await axios.put(`http://localhost:8080/employee/${EmpId}`, newUpdateUser, {
      headers: {
        Authorization: `Bearer ${user[1]}`,
      },
    });
    toast.success(`Employee Id ${EmpId} updated succefully!`);
    getEmployees();
  };

  const handleDelete = async (id) => {
    let isvalid = true;
    await axios
      .delete(`http://localhost:8080/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${user[1]}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          isvalid = true;
        }
        {
          isvalid = false;
        }
      })
      .catch((e) => {
        console.error(e);
      });
    if (!isvalid) {
      toast.success("Employee delete successfully");
    } else {
      toast.error("Employee Not Found successfully");
    }

    getEmployees();
  };

  return (
    <>
      <Layout title={"Employee Details"}>
        <center className="pt-3">
          {" "}
          <button
            className="my-3 btn btn-outline-success"
            onClick={() => {
              navigate("/addEmployee");
            }}
          >
            <MdPersonAddAlt1 /> Add Employee
          </button>
          <table className="container w-75 mx-5 table table-hover my-3 table table-striped">
            <thead>
              <tr className="table-dark">
                <th scope="col"></th>
                <th scope="col">FullName</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Designation</th>
                <th scope="col">Salary</th>
                <th scope="col">Date Of Joining</th>
                <th scope="col">Address</th>
                <th scope="col">Edit</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((ele) => {
                return (
                  <tr key={ele.empId}>
                    <th scope="row">{ele.empId}</th>
                    <td>{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.contactNo}</td>
                    <td>{ele.designation}</td>
                    <td>{ele.salary}</td>
                    <td>{ele.dateOfJoining}</td>
                    <td>{ele.address}</td>
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
                        <BiSolidEditAlt />
                      </button>
                    </td>
                    <td>
                      {" "}
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(ele.empId)}
                      >
                        <RiDeleteBack2Fill />
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
                      value={updateUserDetails.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      aria-label="Last name"
                      name="lastName"
                      value={updateUserDetails.lastName}
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
                      placeholder="phoneNumber"
                      aria-label="First name"
                      name="phoneNumber"
                      value={updateUserDetails.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="my-2 row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="designation"
                      aria-label="First name"
                      name="Designation"
                      value={updateUserDetails.Designation}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="my-2 row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Salary"
                      aria-label="First name"
                      name="salary"
                      value={updateUserDetails.salary}
                      onChange={handleInputChange}
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
                      value={updateUserDetails.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="State"
                      aria-label="Last name"
                      name="state"
                      value={updateUserDetails.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="country"
                      aria-label="Last name"
                      name="country"
                      value={updateUserDetails.country}
                      onChange={handleInputChange}
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
                  onClick={handleSubmit}
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
