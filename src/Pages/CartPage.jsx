import { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { useCartCount } from "../ContextApi/Cart";
import axios from "axios";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartCount, setcartCount] = useCartCount();
  const [cart, setCart] = useState([]);
  const userId = 1;
  const [clientToken, setClientToken] = useState("");
  const [instance, setinstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getPreviousPendingOrder = async () => {
    const { data } = await axios.get(`http://localhost:8080/order/${userId}/pending`);
    console.log("ha data card page", data);
    setCart(data);
  };


  //total price
  const totalPrice = () => {
    try {
      let count = 0;
      let total = 0;
      cart?.map((item, index) => {
        count = index + 1;
        total = total + item.product.price;
        console.log();
      });
      setcartCount(count);
      console.log("cart count", cartCount);
      console.log(total);
      return Math.round(total);
    } catch (error) {
      console.log(error);
    }
  };

  //remove from cart
  const removeCartItem = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/order/delete/${orderId}`);
      toast.success("order removed successfully!");
      getPreviousPendingOrder();

      localStorage.setItem("cartCount", setcartCount(cartCount - 1));
    } catch (error) {
      console.log(error);
    }
  };

    //get payment gateway token
    const getToken = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/braintree/token`);
        setClientToken(data);
        // console.log("token: ",clientToken);
      } catch (error) {
        console.log(error);
      }
    }

    const handlePayment = async () => {
      try {
        setLoading(true);
        await axios.put(`http://localhost:8080/order/${userId}`);
        // console.log("payment data",cart);
        // useId,pid,status,Time ,Date
        setLoading(false);
        setCart([])
        setcartCount(0)
        getPreviousPendingOrder();
        navigate('/userOrder');
        toast.success("Payment Completed Successfully");
      } catch (error) {
        console.log(error);
      }
    };
  useEffect(() => {
    getPreviousPendingOrder();
    getToken();
  }, []);
  return (
    <Layout title={"Cart"}>
      <div className="container pb-2">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello User`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your cart`
                : "Your Cart is Empty"}
            </h4>
          </div>
          <hr />
        </div>

        <div className="row">
          <div className="col-md-8">
            {/* col-md-6 m-1 */}
            <div className="row"></div>
            {cart?.map((p) => (
              <>
                <div className="row mb-2 p-3 card flex-row" key={p.id}>
                  <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <img
                      src={`http://localhost:8080/product/${p.product.id}/image`}
                      className="img-fluid"
                      alt={p.product.name}
                      width={"100px"}
                      height={"100px"}
                    />
                  </div>
                  <div className="col-md-8">
                    <p>{p.product.name}</p>
                    <p>${p.product.price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p.order.orderId)}
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>


          <div className="col-md-4 text-center">
            <h4>Cart Summary</h4>
            <hr />
            <h4>Total: {totalPrice()} </h4>

            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  
                  {clientToken && (
                    
                    <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: 'vault'
                      },
                      googlePay: {
                        merchantId: '1234',
                        transactionInfo: {
                          currencyCode: "INR",
                          countryCode: "IN",
                          totalPriceStatus: "FINAL",
                          totalPrice: totalPrice(),
                          checkoutOption: "DEFAULT"
                        }
                      }, card: {
                        overrides: {
                          styles: {
                            input: {
                              // color: 'blue',
                              // 'font-size': '30px'
                              height:'50px'
                            },
                            
                          }
                        }
                      }
                    }}
                    onInstance={instance => setinstance(instance)}

                  />)}
                  <button className='btn btn-primary' onClick={handlePayment}
                    disabled={loading || !instance}>
                    {loading ? 'Processing...' : 'Make Payment'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

    </Layout >
  );
};

export default CartPage;
