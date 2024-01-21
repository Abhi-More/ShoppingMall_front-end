import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBack2Fill } from "react-icons/ri";


const ManageProduct = () => {
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();
  const allproducts = async () => {
    const data = await axios.get(`http://localhost:8080/product/allproducts`);
    setproducts(data.data);
  };

  useEffect(() => {
    allproducts();
  }, []);

  const [updateProduct, setUpdateProduct] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
  });

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/product/delete/${id}`);
    allproducts();
  };

  const handleEdit = async (id) => {
    const sigleProduct = await axios.get(
      `http://localhost:8080/product/${id}`
    );
    delete sigleProduct.data.image;
  };

  const handleInputChange = (e) => {
    console.log("onchange called");
    const { name, value } = e.target;

    setUpdateProduct((preProductDetails) => ({
      ...preProductDetails,
      [name]: value,
    }));
  };

  const formData = new FormData();

  formData.append("name", "Mobile");
  formData.append("category", "Men");
  formData.append("price", 1459);
  formData.append("image", "");

  const addNewProduct = async () => {
    navigate("/addProduct");
    // axios
    //   .post(`http://localhost:8080/product/addproduct`, formData)
    //   .then((response) => {
    //     console.log("Response:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    // console.log("add product called");
    // allproducts();
  };
  return (
    <>
      <Layout>
        <center className="pt-3">
          {" "}
          <button
            className="my-3 btn btn-outline-success"
            onClick={addNewProduct}
          >
            Add Products
          </button>
          <table className="container w-75 mx-5 table table-hover my-3 table-striped">
            <thead>
              <tr className="table-dark">
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">PRICE</th>
                <th scope="col">EDIT</th>
                <th scope="col">REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {products.map((ele) => {
                return (
                  <tr key={ele.id}>
                    <th scope="row">{ele.id}</th>
                    <td>{ele.name}</td>
                    <td>{ele.category}</td>
                    <td>{ele.price}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          handleEdit(ele.id);
                        }}
                      >
                        <BiSolidEditAlt />
                      </button>
                    </td>
                    <td>
                      {" "}
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(ele.id)}
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
                  Fill Details of Product Id {updateProduct.id}
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
                      placeholder="Product name"
                      aria-label="First name"
                      name="firstName"
                      value={updateProduct.name}
                      onChange={handleInputChange}
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
                      value={updateProduct.category}
                      onChange={handleInputChange}
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
                      value={updateProduct.price}
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

export default ManageProduct;
