import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoSchool } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";

import toast from "react-hot-toast";

import { useCartCount } from "../ContextApi/Cart";
import { Badge } from "antd";
import "../assets/css/HeaderStyle.css";
import { useEffect, useState } from "react";
import { useInfo } from "../ContextApi/ContextApi";
import axios from "axios";
const Header = () => {
  const [cartCount, setCartCount] = useCartCount();
  const [user, setUser] = useInfo();
  const navigate = useNavigate();
  const [username, setUsername] = useState("USER");

  const [userType, setUserType] = useState();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
    toast.success("Logout Successfully");
  };

  const getUser = async () => {
    const response = await axios.get(
      `http://localhost:8080/user/${user[0].id}`,
      {
        headers: {
          Authorization: `Bearer ${user[1]}`,
        },
      }
    );
    setUserType(response.data.roles);
    setUsername(response.data.name);
  };

  useEffect(() => {
    let status;
    if (user.length == 0) {
      status = "Null";
    } else {
      status = "Not Null";
    }

    if (user) {
      getUser();
    }
  }, [user]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" style={{ fontSize: "18px" }}>
              <IoSchool /> BlinkCart
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mx-5">
              {/* <SearchInput /> */}
              <li className="nav-item mx-1">
                <NavLink to="/" className="nav-link btn-2">
                  <b>Home</b>
                </NavLink>
              </li>

              <li className="nav-item dropdown mx-1">
                <Link
                  className="nav-link dropdown-toggle"
                  to=""
                  data-bs-toggle="dropdown"
                >
                  <b>Categories</b>
                </Link>
                <ul className="dropdown-menu" style={{ fontSize: "15px" }}>
                  <li>
                    <Link className="dropdown-item" to="/">
                      {" "}
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/men">
                      {" "}
                      Men
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/women">
                      Women
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/electronics">
                      Electronics
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/accessories">
                      Accessories
                    </Link>
                  </li>
                </ul>
              </li>
              {user.length > 0 ? (
                <>
                  <li className="nav-item dropdown mx-1">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {username}
                    </NavLink>
                    <ul className="dropdown-menu" style={{ fontSize: "15px" }}>
                      <li>
                        <NavLink to={`/profile`} className="dropdown-item">
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={`/employee`}
                          className={`dropdown-item ${
                            userType === "ADMIN" ? "d-block" : "d-none"
                          }`}
                        >
                          Manage Employees
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={`/product`}
                          className={`dropdown-item ${
                            userType === "ADMIN" ? "d-block" : "d-none"
                          }`}
                        >
                          Manage Products
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={`/userOrder`} className={"dropdown-item"}>
                          Order history
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                          style={{ color: "red" }}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item p-1 mx-1">
                    <Badge
                      count={isNaN(cartCount) ? setCartCount(0) : cartCount}
                      showZero
                    >
                      <NavLink to="/cart" className="nav-link">
                        <span
                          style={{ fontFamily: "Poppins", fontSize: "20px" }}
                        >
                          <IoMdCart />
                        </span>
                      </NavLink>
                    </Badge>
                  </li>
                </>
              ) : (
                <li className="nav-item mx-1">
                  <NavLink
                    to="/login"
                    className="nav-link btn-2"
                    style={{ color: "blue" }}
                  >
                    <b>Login</b>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
