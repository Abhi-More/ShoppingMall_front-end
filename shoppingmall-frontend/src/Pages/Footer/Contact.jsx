import React from 'react';
import Layout from '../../Layout/Layout';
import { BiMailSend,BiPhoneCall,BiSupport } from "react-icons/bi";
import { Link } from 'react-router-dom';
import ContactPic from '/cs.jpg'
import '../../assets/css/Footer.css'
const Contact = () => {

  const handleMailtoClick = (event) => {
    // Prevent the default behavior of the link
    event.preventDefault();

    // Execute the mailto action
    window.location.href = 'mailto:contact@shoppingmall.com';
  };
  return (
    <Layout title={"Contact Us"}>
      <div className="row contact_us">
        <div className="col-md-6">
          <img src={ContactPic} alt="contactus" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4 pt-4">
          <h1 className="text-center p-2 ">Contact Us</h1>
          <hr />
          <p className="text-justify mt-2">
            Any Query and Info about Product..Feel free to reach us, We're 24X7 available
          </p>
          <p className="mt-3"><Link className='btn btn-outline-dark' onClick={handleMailtoClick}><BiMailSend /></Link> : team5.ecommerce@gmail.com</p>
          <p className="mt-3"><Link className='btn btn-outline-dark'><BiPhoneCall /></Link> : 012-345678910</p>
          <p className="mt-3"><Link to='' className='btn btn-outline-dark'><BiSupport /></Link> : 1800-0000-0000</p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
