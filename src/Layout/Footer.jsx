import React from 'react';
import '../assets/css/Footer.css';
import { FaGithub } from "react-icons/fa6";
import { SiGeeksforgeeks } from "react-icons/si";
import { MdWork } from "react-icons/md";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (<>
  <hr />
    <div className="footer-basic">
      <footer>
        <div className="social">
          <Link to="https://ashutoshkportfolio.netlify.app/" target='_blank'><MdWork/></Link>
          <Link to="https://github.com/Abhi-More/ShoppingMall_back-end" target='_blank'><FaGithub/></Link>
          <Link to="https://github.com/Abhi-More/ShoppingMall_front-end" target='_blank'><FaGithub/></Link>
        </div>
        <ul className="list-inline">
          <li className="list-inline-item"><Link to='/homepage'>Home</Link></li>
          <li className="list-inline-item"><Link to='/about'>About</Link></li>
          <li className="list-inline-item"><Link to='/contact'>Contact</Link></li>
          <li className="list-inline-item"><Link to='/policy'>Privacy Policy</Link></li>
        </ul>
        <p className="copyright">All right Reserved &copy; Team 7</p>
      </footer>
    </div>


  </>
  )
}

export default Footer
