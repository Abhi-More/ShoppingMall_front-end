import { Link } from "react-router-dom";
import EmployeeDetails from "./EmployeeDetails";
const Home = () => {
  return (
    <>
      <center>
        <h1>Home page</h1>
      </center>
      <nav>
        <ul>
          <li>
            <Link to="/profilePage">User Profile </Link>
          </li>
          <li>
            {" "}
            <Link to="/">logout</Link>{" "}
          </li>
        </ul>
      </nav>

      <EmployeeDetails />
    </>
  );
};

export default Home;
