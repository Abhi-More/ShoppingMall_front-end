import React from 'react';
import Layout from '../../Layout/Layout';
import { Link } from 'react-router-dom';
import PolicyPic from '/pp.jpg'
import '../../assets/css/Footer.css'
const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contact_us">
        <div className="col-md-5">
          <img src={PolicyPic} alt="contactus" style={{ width: "100%" }} />
        </div>
        <div className="col-md-7">
          <div className="container mt-4">
            <h1>Privacy Policy</h1>
            <p>Last Updated: 01/02/24</p>

            <h2>Information We Collect</h2>
            <p>
              We collect basic information that you voluntarily provide, such as contact information (e.g., email address).
            </p>

            <h2>How We Use Your Information</h2>
            <p>
              We use the collected information to provide and improve our services, communicate with you about your orders
              and inquiries, and enhance your user experience on our Site.
            </p>

            <h2>Information Sharing</h2>
            <p>We do not sell, trade, or share your personal information with third parties. Your privacy is important to us.</p>

            <h2>Data Security</h2>
            <p>
              We take reasonable measures to protect your information, but please be aware that no method of data transmission
              over the internet is completely secure.
            </p>

            <h2>Your Choices</h2>
            <p>
              You can opt-out of receiving promotional emails from us by following the unsubscribe instructions in the emails
              you receive. Please note that even if you opt-out, you may still receive transactional emails related to your
              account.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. Any changes will be posted on this page.</p>

            <h2>Contact Us</h2>
            <p>If you have any questions or concerns about our Privacy Policy, please contact us at <Link to='mailto:contact@blinkcartsupport.com'>[contact@blinkcartsupport.com] </Link> .</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Policy
