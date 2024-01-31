import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
const UserOrders = () => {
  const [orders, setorders] = useState([]);
  const allproducts = async () => {
    const data = await axios.get(`http://localhost:8080/order/all`);
    console.log(data.data);
    setorders(data.data);
  };

  useEffect(() => {
    allproducts();
  }, []);

  return (
    <>
      <Layout>
        <center className="pt-3">
          {" "}
          <table className="container w-75 mx-5 table table-hover my-3 table-striped">
            <thead>
              <tr className="table-dark">
                <th scope="col">User ID</th>
                <th scope="col">Order ID</th>
                <th scope="col">Product ID</th>
                <th scope="col">Product NAME</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">PRICE</th>
                <th scope="col">DATE</th>
                <th scope="col">TIME</th>
                <th scope="col">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((ele) => {
                return (
                  <tr key={ele.order.orderId}>
                    <th scope="row">{ele.order.userId}</th>
                    <th scope="row">{ele.order.orderId}</th>
                    <th scope="row">{ele.product.id}</th>
                    <td>{ele.product.name}</td>
                    <td>{ele.product.category}</td>
                    <td>{ele.product.price}</td>
                    <td>{ele.timeAndDate === null ? "10/2/2024" : ele.order.timeAndDate.split(" ")[2]+" / "+ele.order.timeAndDate.split(" ")[1]+" / "+ele.order.timeAndDate.split(" ")[5]}</td>
                    <td>{ele.order.timeAndDate === null ? "5:54:22 PM" : ele.order.timeAndDate.split(" ")[3]}</td>
                    <td
                      style={{
                        color: `${
                          ele.order.status === "PENDING" ? "red" : "green"
                        }`,
                        fontWeight: "bolder",
                        fontFamily: "initial",
                        fontVariant: "full-width",
                        fontVariantCaps: "all-petite-caps",
                        fontSize: "16px",
                      }}
                    >
                      {ele.order.status === null ? "PENDING" : ele.order.status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </center>
      </Layout>
    </>
  );
};

export default UserOrders;
