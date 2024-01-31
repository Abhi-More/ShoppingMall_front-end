import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import {Toaster} from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      {/* {console.log(children)} */}
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster/>
        {children}
      </main>
      <Footer />
    </>
  )
}


Layout.defaultProps={
  title:'ShoppingMall- Shop Now',
  description:'Springboot Project',
  keywords:'React.js,MySql,SpringBoot',
  author:'Group 7'
}

export default Layout
