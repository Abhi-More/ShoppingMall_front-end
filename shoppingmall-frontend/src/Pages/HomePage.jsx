import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useCartCount } from "../ContextApi/Cart";
import { Modal } from "antd";
import { useInfo } from "../ContextApi/ContextApi";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [CartCount, setCartCount] = useCartCount();
  const [user] = useInfo();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ProductDetail, setProductDetail] = useState([]);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const showModal = (productId) => {
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
    setOpen(false);
  };
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/product/allproducts`,
        { withCredentials: false }
      );
      setLoading(false);
      setProducts(data);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //get product
  const getProduct = async (productId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/product/get/${productId}`
      );
      setProductDetail(data);
    } catch (error) {
      console.error(error);
    }
  };
  const orders = {
    userId: user.length === 0 ? "" : user[0].id,
    productId: "",
    status: "PENDING",
    timeAndDate: "",
  };

  const addToCard = async () => {
    if (user.length === 0) {
      toast.error("Please Log in to add items in Cart");
      navigate("/login");
    }

    await axios
      .post(
        `http://localhost:8080/order/add`,
        {
          ...orders,
          productId: ProductDetail.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user[1]}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setCartCount(CartCount + 1);
          localStorage.setItem("cartCount", CartCount);
          toast.success("Item Added to Cart");
        } else {
          toast.error("Failed to Add ");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getProduct();
  }, [CartCount]);

  return (
    <Layout title={"BlinkCart- Shop Now"}>
      <div className="col-md-12 order-md-2 order-1 pt-2">
        <div className="d-flex flex-wrap justify-content-center">
          {products?.map((p) => {
            return (
              <>
                <div
                  className="card m-4 p-3"
                  style={{ width: "16rem", height: "24rem" }}
                >
                  <img
                    src={`http://localhost:8080/product/${p.id}/image`}
                    onClick={() => showModal(p.id)}
                    className="card-img-top"
                    alt={p.name}
                    style={{ height: "280px" }}
                  />
                  <div className="card-body text-center px-2">
                    <h5 style={{ color: "#878787" }} className="card-title">
                      <b>{p.name}</b>
                    </h5>
                    <div>
                      <b>
                        <p
                          style={{
                            float: "left",
                            color: "black",
                            fontSize: "16px",
                          }}
                          className="card-text"
                        >
                          ₹ {p.price}
                        </p>
                        <p
                          style={{
                            color: "#388e3c",
                            float: "right",
                            fontSize: "16px",
                          }}
                          className="card-text"
                        >
                          {p.discount}% off
                        </p>
                      </b>
                    </div>

                    <Modal
                      title="Product Detail"
                      open={open}
                      onOk={handleOk}
                      confirmLoading={confirmLoading}
                      onCancel={handleCancel}
                      width={1000}
                    >
                      <div className="row container">
                        <div className="col-md-6">
                          <img
                            src={`http://localhost:8080/product/${selectedProduct}/image`}
                            className="img-fluid rounded"
                            alt={selectedProduct}
                            style={{ height: "300px" }}
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex flex-column justify-content-between h-100 p-3">
                            <div>
                              <h2 style={{ color: "#2874f0" }}>
                                {ProductDetail.name}
                              </h2>
                              <p
                                style={{
                                  fontSize: "15px",
                                  marginBottom: "-8px",
                                }}
                              >
                                special price
                              </p>
                              <b>
                                <p style={{ color: "black", fontSize: "30px" }}>
                                  &#x20B9; {ProductDetail.price}{" "}
                                  <span
                                    style={{
                                      color: "#388e3c",
                                      fontSize: "18px",
                                      marginLeft: "15px",
                                    }}
                                  >
                                    {ProductDetail.discount}% off
                                  </span>
                                </p>
                              </b>
                              <p>Category : {ProductDetail?.category}</p>
                              <h6>{ProductDetail.description}</h6>
                              <button
                                className="btn btn-light ms-1 btn-outline-dark m-1"
                                onClick={addToCard}
                                style={{ width: "100%" }}
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
