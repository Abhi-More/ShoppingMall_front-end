import React from 'react';
import Layout from '../../Layout/Layout';
import AboutPic from '/about.jpg'
import '../../assets/css/Footer.css'
const About = () => {
  return (
    <Layout title={"About us - BlinkCart"}>
      <div className="row contact_us">
        <div className="col-md-5">
          <img src={AboutPic} alt="contactus" style={{ width: "100%"}} />
        </div>
        <div className="col-md-6 pt-4">
          <h1>About Us</h1>

          <section>
            <h2>Our Mission</h2>
            <p>
            At BlinkCart, we are committed to simplifying the shopping experience by providing a seamless platform for users to access a diverse range of products. Whether you're looking for the latest fashion trends or essential electronics, BlinkCart has it all.

            </p>
          </section>

          <section>
            <h2>What We Offer</h2>
            <h3>Daily Essentials</h3>
            <p>
            Discover a curated collection of high-quality products tailored to meet the diverse needs of our customers. From fashion to electronics, BlinkCart offers a wide range of essentials to enhance your shopping experience.

            </p>

            <h3>Services</h3>
            <p>
            At BlinkCart, we focus on delivering an exceptional shopping experience. We strive to offer top-notch customer service and support.

            </p>
          </section>

          <section>
            <h2>Why Choose us?</h2>
            <ul>
              <li>
                <strong>Convenience:</strong> Shop for all your college needs from the comfort of your home.
              </li>
              <li>
                <strong>Quality:</strong> We source top-notch products to ensure your satisfaction.
              </li>
              <li>
                <strong>Reliability:</strong> Count on us for timely deliveries and efficient Xerox services.
              </li>
              <li>
                <strong>Secure Payments:</strong> Enjoy peace of mind with our secure online payment options.
              </li>
            </ul>
          </section>

          <section>
            <h2>How It Works</h2>
            <ol>
              <li>
                <strong>Browse Products:</strong> Explore our extensive collection of college essentials.
              </li>
              <li>
                <strong>Add to Cart:</strong> Select the items you need and add them to your shopping cart.
              </li>
              <li>
                <strong>Secure Checkout:</strong> Complete your purchase securely with our online payment options.
              </li>
              
            </ol>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default About
