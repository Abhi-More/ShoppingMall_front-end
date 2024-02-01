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
  const navigate = useNavigate();
  const [user,setUser]=useInfo()
  const getEmployees = async () => {
    const data = await axios.get(`http://localhost:8080/employee/all`,
    {
      headers: {
        Authorization: `Bearer ${user[1]}`,
      },
    });
    setEmployees(data.data);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const [updateUserDetails, setUpdateUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    state: "",
    country: "",
  });
  const handleDelete = async (id) => {
    let isvalid = true;
    const resp = await axios
      .delete(`http://localhost:8080/employee/${id}`,
      {
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

  const [EmpId, setEmpId] = useState("");
  const handleEdit = (id) => {
    setEmpId(id);
  };


  return (
    <>
      <Layout title={"Employee Details"}>
        <center className="pt-3">
          {" "}
          <button
            className="my-3 btn btn-outline-success"
            onClick={() => {navigate("/addEmployee")}}
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
                        !employees[EmpId - 1] ? "" : employees[EmpId - 1].email
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
