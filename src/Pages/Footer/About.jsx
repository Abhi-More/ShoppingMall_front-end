import React from 'react';
import Layout from '../../Layout/Layout';
import AboutPic from '/about.jpg'
import '../../assets/css/Footer.css'
const About = () => {
  return (
    <Layout title={"About us - ShoppingMall"}>
      <div className="row contact_us">
        <div className="col-md-5">
          <img src={AboutPic} alt="contactus" style={{ width: "100%"}} />
        </div>
        <div className="col-md-6 pt-4">
          <h1>About Us</h1>

          <section>
            <h2>Our Mission</h2>
            <p>
              At CollegeCrafters, we are on a mission to simplify the college experience by providing a seamless platform
              for students to access a wide range of college-related essentials. From stationery to uniforms, we've got you covered.
            </p>
          </section>

          <section>
            <h2>What We Offer</h2>
            <h3>Daily Essentials</h3>
            <p>
              Discover a curated collection of high-quality stationery and college uniforms tailored to meet the diverse needs
              of college students. We understand the importance of having the right tools for success, and our products are designed
              to enhance your academic journey.
            </p>

            <h3>Services</h3>
            <p>
              Say goodbye to the hassle of finding a nearby copy center. With our Xerox services, you can conveniently upload
              your PDF documents and receive high-quality photocopies at your desired location. It's quick, easy, and designed
              to save you time.
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
