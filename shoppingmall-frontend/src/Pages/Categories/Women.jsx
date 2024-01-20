import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../ContextApi/Cart";
import { Button, Modal } from "antd";
const Women = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ProductDetail, setProductDetail] = useState([]);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const showModal = (productId) => {
    console.log(productId);
    setSelectedProduct(productId);
    setOpen(true);
    getProduct(productId);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://192.168.1.3:8080/product/allproducts/womens`,
        { withCredentials: false }
      );
      setLoading(false);
      // console.log(data);
      setProducts(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // const params = useParams();
  // const [cart, setCart] = useCart();
  const [product, setProduct] = useState([]);

  //get product
  const getProduct = async (productId) => {
    try {
      const { data } = await axios.get(
        `http://192.168.1.3:8080/product/${productId}`
      );

      console.log(data);
      setProductDetail(data);
      // setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Layout title={"ShoppingMall- Shop Now"}>
      {/* <div className="row mt-3"> */}

      <div className="col-md-12 order-md-2 order-1 pt-2">
        <h1 className="text-center">Women's Category</h1>
        <hr />

        <div className="d-flex flex-wrap justify-content-center">
          {products?.map((p) => {
            return (
              <>
                <div className="card m-4" style={{ width: "18rem" }}>
                  <img
                    src={`http://192.168.1.3:8080/product/${p.id}/image`}
                    className="card-img-top"
                    onClick={() => showModal(p.id)}
                    alt={p.name}
                    height={"300px"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.category}</p>
                    <p className="card-text">Rs.{p.price}</p>

                    <button
                      className="btn btn-light ms-1 btn-outline-dark m-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to Cart");
                      }}
                    >
                      Add to Cart
                    </button>

                    <Modal
                      title="Product Detail"
                      open={open}
                      onOk={handleOk}
                      confirmLoading={confirmLoading}
                      onCancel={handleCancel}
                      width={1000}
                    >
                      {/* <ProductDetails productId={p.id}/> */}
                      {/* -------------------------------------------------- */}

                      <div className="row container mt-3">
                        <div className="col-md-6">
                          <img
                            src={`http://192.168.1.3:8080/product/${selectedProduct}/image`}
                            className="img-fluid rounded"
                            alt={selectedProduct}
                            height={"300px"}
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex flex-column justify-content-between h-100 p-3">
                            <div>
                              <h1 className="text-center">Product Details</h1>
                              <hr />
                              {console.log(ProductDetail)}
                              <h6>Name :{ProductDetail.name}</h6>
                              <h6>Price :{ProductDetail.price}</h6>
                              <h6>Category :{ProductDetail?.category}</h6>
                              <button
                                className="btn btn-light ms-1 btn-outline-dark m-1"
                                onClick={() => {
                                  setCart([...cart, ProductDetail]);
                                  localStorage.setItem(
                                    "cart",
                                    JSON.stringify([...cart, ProductDetail])
                                  );
                                  toast.success("Item Added to Cart");
                                }}
                                style={{ width: "100%" }}
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* -------------------------------------------------- */}
                    </Modal>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      {/* </div> */}
    </Layout>
  );
};

export default Women;
