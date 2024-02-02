import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./Pages/ProfilePage";
import SignupDemo from "./Pages/SignupDemo";
import LoginDemo from "./Pages/LoginDemo";
import About from "./Pages/Footer/About";
import Contact from "./Pages/Footer/Contact";
import Policy from "./Pages/Footer/Policy";
import PageNotFound from "./Pages/PageNotFound";
import HomePage from "./Pages/HomePage";
import Men from "./Pages/Categories/Men";
import Women from "./Pages/Categories/Women";
import Electronics from "./Pages/Categories/Electronics";
import Accessories from "./Pages/Categories/Accessories";
import CartPage from "./Pages/CartPage";
import EmployeeDetails from "./Pages/EmployeeDetails";
import ManageProduct from "./Pages/ManageProduct";
import AddEmployee from "./Pages/AddEmployee";
import AddProduct from "./Pages/AddProduct";
import UserOrders from "./Pages/UserOrders";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<LoginDemo />} />
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/signup" element={<SignupDemo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/employee" element={<EmployeeDetails />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/product" element={<ManageProduct />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/userOrder" element={<UserOrders />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
