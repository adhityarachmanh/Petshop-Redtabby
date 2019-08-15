import React from "react";
import Navbar from "./components/layout/navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./View/Homepage";
import Signin from "./View/Auth/Signin";
import Signup from "./View/Auth/Signup";

import "aos/dist/aos.css";
import "sweetalert2/src/sweetalert2.scss";
import ShopPage from "./View/shop/ShopPage";
import "./assets/css/style.css";
import CartPage from "./View/CartPage/CartPage";
import CheckoutPage from "./View/checkout/CheckoutPage";
import OrderPage from "./View/orderPage/OrderPage";
import ManageAkun from "./View/Auth/ManageAkun/ManageAkun";
import Footer from "./components/layout/footer";
import Grooming from "./View/grooming/Grooming";
import ClinicPage from "./View/Clinic/ClinicPage";
import ContactUsPage from "./View/ContactUs/ContactUsPage";
import AboutUsPage from "./View/AboutUs/AboutUsPage";

function App() {
  return (
    <Router>
      <Navbar />
      <>
        <Route path="/" exact component={Homepage} />
        <Route path="/login-page" component={Signin} />
        <Route path="/register-page" component={Signup} />
        <Route path="/grooming" component={Grooming} />
        <Route path="/clinic" component={ClinicPage} />
        <Route path="/about-us" component={AboutUsPage} />
        <Route path="/contact-us" component={ContactUsPage} />
        <Route path="/shop/:pet/:category" component={ShopPage} />
        <Route path="/cart-page" component={CartPage} />
        <Route path="/checkout-page" component={CheckoutPage} />
        <Route path="/order-page/:id" component={OrderPage} />
        <Route path="/Manage-Akun" component={ManageAkun} />
      </>
      <Footer />
    </Router>
  );
}

export default App;
