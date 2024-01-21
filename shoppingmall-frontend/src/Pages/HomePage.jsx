import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useCartCount } from "../ContextApi/Cart";
import { Modal } from "antd";
const HomePage = () => {
  const [CartCount, setCartCount] = useCartCount();

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
      console.log("order Placed");
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
        `http://localhost:8080/product/allproducts`,
        { withCredentials: false }
      );
      setLoading(false);
      setProducts(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //get product
  const getProduct = async (productId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/product/${productId}`
      );

      setProductDetail(data);
    } catch (error) {
      console.log(error);
    }
  };
  const orders = {
    userId: 1,
    productId: 5,
    status: "PENDING",
    timeAndDate: "",
  };

  const addToCard = async () => {
    const { data } = await axios
      .post(`http://localhost:8080/order/add`, {
        ...orders,
        productId: ProductDetail.id,
      })
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
        console.log(err);
      });
  };
  useEffect(() => {
    getProduct();
  }, [CartCount]);

  return (
    <Layout title={"ShoppingMall- Shop Now"}>
      <div className="col-md-12 order-md-2 order-1 pt-2">
        <div className="d-flex flex-wrap justify-content-center">
          {products?.map((p) => {
            return (
              <>
                <div
                  className="card m-4 "
                  style={{ width: "16rem", height: "25rem" }}
                >
                  <img
                    src={`http://localhost:8080/product/${p.id}/image`}
                    onClick={() => showModal(p.id)}
                    className="card-img-top"
                    alt={p.name}
                    height={"300px"}
                    style={{ height: "300px" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{p.name}</h5>
                    {/* <p className="card-text">{p.category}</p> */}
                    <p className="card-text">Rs.{p.price}</p>

                    <Modal
                      title="Product Detail"
                      open={open}
                      onOk={handleOk}
                      confirmLoading={confirmLoading}
                      onCancel={handleCancel}
                      width={1000}
                    >
                      <div className="row container mt-3">
                        <div className="col-md-6">
                          <img
                            src={`http://localhost:8080/product/${selectedProduct}/image`}
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
                              <h6>Name :{ProductDetail.name}</h6>
                              <h6>Price :{ProductDetail.price}</h6>
                              <h6>Category :{ProductDetail?.category}</h6>
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
