import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoSchool } from "react-icons/io5";
// import { useAuth } from '../../context/auth';
import Men from '../Pages/Categories/Men'
import Women from '../Pages/Categories/Women'
import Electronics from '../Pages/Categories/Electronics'
import Accessories from '../Pages/Categories/Accessories'
import toast from 'react-hot-toast';
// import SearchInput from '../Form/SearchInput';
// import useCategory from '../../hooks/useCategory';
import { useCart } from '../ContextApi/Cart';
import { Badge } from 'antd';
import '../assets/css/HeaderStyle.css';
const Header = () => {
    //   const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    //   const categories = useCategory();
    const navigate = useNavigate()
    const handleLogout = () => {
        // Logic
        navigate('/')
        toast.success("Logout Successfully");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to="/homepage" className="navbar-brand"><IoSchool /> ShoppingMall</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {/* <SearchInput /> */}
                            <li className="nav-item">
                                <NavLink to="/homepage" className="nav-link btn-2">Home</NavLink>
                            </li>
                            {/* <li className="nav-item">
                <NavLink to="/xerox" className="nav-link">Photocopy</NavLink>
              </li> */}
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to=''
                                    data-bs-toggle='dropdown'>
                                    Categories
                                </Link>
                                <ul className='dropdown-menu'>
                                    <li>
                                        <Link className='dropdown-item'
                                            to='/men'> Men's Clothing</Link>
                                    </li>
                                    <li>
                                        <Link className='dropdown-item'
                                            to='/women'>Women's Clothing</Link>
                                    </li>
                                    <li>
                                        <Link className='dropdown-item'
                                            to='/electronics'>Electronics</Link>
                                    </li>
                                    <li>
                                        <Link className='dropdown-item'
                                            to='/accessories'>Accessories</Link>
                                    </li>

                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    User
                                </NavLink>
                                <ul className="dropdown-menu">
                                    {/* need to find user and redirect to resp. profile using id */}
                                    <li><NavLink to={`/profile`} className="dropdown-item" >Dashboard</NavLink></li>
                                    <li><NavLink onClick={handleLogout} to="/login" className="dropdown-item">Logout</NavLink></li>
                                </ul>
                            </li>


                            <li className="nav-item p-1">
                                <Badge count={cart?.length} showZero>
                                    <NavLink to="/cart" className="nav-link"><span style={{ fontFamily: 'Poppins', fontSize: '17px' }}>Cart</span></NavLink>
                                </Badge>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header
