import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { useCart } from "../ContextApi/Cart";
// import { useAuth } from '../context/auth';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();
  // const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  // const [clientToken, setClientToken] = useState("");
  // const [instance, setinstance] = useState("");

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
      //     maximumFractionDigits: 2,
      //     style: 'currency',
      //     currency: 'INR'
      // });
    } catch (error) {
      console.log(error);
    }
  };

  //remove from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item.id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/homepage");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Cart"}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 w-100">
            <h1 className="text-center bg-light p-2 mb-1">{`Hello User`}</h1>
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
            {cart?.map((p) => (
              <>
                <div className="row mb-2 p-3 card flex-row" key={p.id}>
                  <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <img
                      src={`http://192.168.1.3:8080/product/${p.id}/image`}
                      className="img-fluid"
                      alt={p.name}
                      width={"100px"}
                      height={"100px"}
                    />
                  </div>
                  <div className="col-md-8">
                    <p>{p.name}</p>
                    <p>{p.category}</p>
                    <p>{p.price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p.id)}
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
              {!cart?.length ? (
                ""
              ) : (
                <>
                  <button className="btn btn-primary" onClick={handlePayment}>
                    Make Payment
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
