import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useInfo } from "../ContextApi/ContextApi";

import toast from "react-hot-toast";

const ManageProduct = () => {
  const [products, setproducts] = useState([]);
  const [user, setUser] = useInfo();
  const navigate = useNavigate();
  const allproducts = async () => {
    const data = await axios.get(`http://localhost:8080/product/allproducts`);
    setproducts(data.data);
  };

  useEffect(() => {
    allproducts();
  }, []);

  const [updateProduct, setUpdateProduct] = useState({
    productId: "",
    productName: "",
    productPrice: 0,
    productDiscount: 0,
  });

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/product/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${user[1]}`,
      },

      withCredentials: false,
    });
    allproducts();
  };

  const handleEdit = async (id) => {
    const sigleProduct = await axios.get(
      `http://localhost:8080/product/get/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user[1]}`,
        },

        withCredentials: false,
      }
    );
    delete sigleProduct.data.image;
    setUpdateProduct({
      productId: sigleProduct.data.id,
      productName: sigleProduct.data.name,
      productPrice: sigleProduct.data.price,
      productDiscount: sigleProduct.data.discount,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUpdateProduct((preProductDetails) => ({
      ...preProductDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (id) => {
    const newUpdateProduct = {
      name: updateProduct.productName,
      price: updateProduct.productPrice,
      discount: updateProduct.productDiscount,
    };
    console.log({ newUpdateProduct });
    await axios
      .put(`http://localhost:8080/product/update/${id}`, newUpdateProduct, {
        headers: {
          Authorization: `Bearer ${user[1]}`,
        },

        withCredentials: false,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("product update");
        } else if (res.status === 400) {
          toast.error("invalid input");
        }
      })
      .catch((err) => {
        console.error(err);
      });
    allproducts();
  };

  const clearInput = () => {
    setUpdateProduct({
      productId: 0,
      productName: "",
      productPrice: 0,
      productDiscount: 0,
    });
  };
  return products.length === 0 ? (
    <Layout>
      <div className="text-center my-5">
        <div className="spinner-border spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </Layout>
  ) : (
    <>
      <Layout title={"Manage Product"}>
        <center className="pt-3">
          {" "}
          <button
            className="my-3 btn btn-outline-success"
            onClick={() => {
              navigate("/addProduct");
            }}
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
                <th scope="col">Discount</th>
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
                    <td>{ele.discount} %</td>
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
          className="modal fade "
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Fill Details of Product Id {updateProduct.productId}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="my-2 row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Product Name"
                      aria-label="First name"
                      name="productName"
                      value={updateProduct.productName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="my-2 row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Product Price"
                      aria-label="First name"
                      name="productPrice"
                      value={updateProduct.productPrice}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="my-2 row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Product Discount"
                      aria-label="First name"
                      name="productDiscount"
                      value={updateProduct.productDiscount}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={clearInput}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="mx-5 btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    handleSubmit(updateProduct.productId);
                  }}
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
