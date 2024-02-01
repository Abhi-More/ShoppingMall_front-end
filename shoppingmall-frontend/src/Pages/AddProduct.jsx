import Layout from "../Layout/Layout";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useInfo } from "../ContextApi/ContextApi";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const [user,setUser]=useInfo()
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: null,
    discount: ""
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setProductData({
        ...productData,
        [name]: e.target.files[0],
      });
    } else {
      setProductData({
        ...productData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    console.log("Product details saved Successfully!", productData);

    if (
      (productData.name === "") |
      (productData.price === "") |
      (productData.image === null) |
      (productData.description === "") |
      (productData.discount === "")
    ) 
    {
      toast.error("Please fill all fields");
    } 
    else if (productData.category === "") 
    {
      toast.error("Please Select Category");
    } 
    else {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("category", productData.category);
      formData.append("price", productData.price);
      formData.append("image", productData.image);
      formData.append("description", productData.description);
      formData.append("discount", productData.discount);
      const response = await axios
        .post("http://localhost:8080/product/addproduct", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user[1]}`,
          },
        })
        .then((res) => {
          if (res.status === 200) toast.success("Product Added");
          navigate('/product')
        })
        .catch((err) => {
          toast.error("Error in adding product");
        });
    }
  };

  return (
    <Layout>
      <div
        className="container mt-5 py-3 px-5"
        style={{
          width: "850px",
          padding: "0px 50px",
          background: "rgb(234 234 234)",
        }}
      >
        <h3 className="mb-3" style={{ textAlign: "center" }}>
          Fill Product Details
        </h3>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            required="true"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            placeholder="Product name"
          />
        </div>
        <div className="mb-3">
          <select
            className="form-control"
            id="category"
            required="true"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="mens">Men's</option>
            <option value="womens">Women's</option>
            <option value="electronics">Electronics</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            type="number"
            title="Please enter a valid number"
            className="form-control"
            id="price"
            name="price"
            required="true"
            value={productData.price}
            onChange={handleInputChange}
            placeholder="Product price"
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            id="discount"
            name="discount"
            required="true"
            value={productData.discount}
            onChange={handleInputChange}
            placeholder="Product discount"
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="description"
            name="description"
            required="true"
            value={productData.description}
            onChange={handleInputChange}
            placeholder="Product description"
          ></textarea>
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

export default AddProduct;
