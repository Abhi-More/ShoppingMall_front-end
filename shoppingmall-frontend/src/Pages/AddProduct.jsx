import Layout from "../Layout/Layout";
import React, { useState } from 'react';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    productName: '',
    category: ['mens','womens','electronics','accessories'],
    price: '',
    image: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product details saved Successfully!', productData);
  };

  return (
    <Layout>
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h2>Product Form</h2>
        <div className="mb-3">
          {/* <label htmlFor="productName" className="form-label">
            Product Name
          </label> */}
          <input
            type="text"
            className="form-control"
            id="productName"
            name="productName"
            value={productData.productName}
            onChange={handleInputChange}
            placeholder="Enter product name"
          />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="category" className="form-label">
            Category
          </label> */}
          <select
            className="form-control"
            id="category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
          >
            <option value="mens">Men's</option>
            <option value="womens">Women's</option>
            <option value="electronics">Electronics</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        <div className="mb-3">
          {/* <label htmlFor="price" className="form-label">
            Product Price
          </label> */}
          <input
            type="text"
            pattern="\d+"
            title="Please enter a valid number"
            className="form-control"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            placeholder="Enter product price"
          />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="image" className="form-label">
            Product Image
          </label> */}
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="description" className="form-label">
            Product Description
          </label> */}
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </Layout>
  );
};
export default AddProduct;
