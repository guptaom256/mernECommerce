import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import React from "react";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSign from "./component/User/LoginSign.js";
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Cart/MyOrders.js";
import OrderDetails from "./component/Cart/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact.js";
import NotFound from "./component/layout/Not Found/NotFound.js";
// import axios from "axios";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import ProtectedRoute from "./component/Route/ProtectedRoute.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  // const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    // const { data } = await axios.get("/api/v1/stripeapikey");
    // setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <div className="app">
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          {
            <Route
              exact
              path={isAuthenticated ? "/account" : "/login"}
              element={isAuthenticated ? <Profile /> : <LoginSign />}
            />
          }
          {
            <Route
              exact
              path={isAuthenticated ? "/me/update" : "/login"}
              element={isAuthenticated ? <UpdateProfile /> : <LoginSign />}
            />
          }
          {isAuthenticated && (
            <Route exact path="/password/update" element={<UpdatePassword />} />
          )}
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route exact path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSign />} />
          {isAuthenticated && (
            <Route exact path="/login/shipping" element={<Shipping />} />
          )}
          {isAuthenticated && (
            <Route exact path="/order/confirm" element={<ConfirmOrder />} />
          )}
          {isAuthenticated && (
            <Route exact path="/process/payment" element={<Payment />} />
          )}
          {isAuthenticated && (
            <Route exact path="/success" element={<OrderSuccess />} />
          )}
          {isAuthenticated && (
            <Route exact path="/orders" element={<MyOrders />} />
          )}
          {isAuthenticated && (
            <Route exact path="/order/:id" element={<OrderDetails />} />
          )}
          {isAuthenticated && user.role === "admin" && (
            <Route exact path="/admin/dashboard" element={<Dashboard />} />
          )}
          {isAuthenticated && user.role === "admin" && (
            <Route exact path="/admin/products" element={<ProductList />} />
          )}
          {isAuthenticated && user.role === "admin" && (
            <Route exact path="/admin/product" element={<NewProduct />} />
          )}
          {isAuthenticated && user.role === "admin" && (
            <Route
              exact
              path="/admin/product/:id"
              element={<UpdateProduct />}
            />
          )}
          {isAuthenticated && user.role === "admin" && (
            <Route exact path="/admin/orders" element={<OrderList />} />
          )}
          {isAuthenticated && user.role === "admin" && (
            <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
          )}
          {isAuthenticated && user.role === "admin" && (
            <Route exact path="/admin/users" element={<UsersList />} />
          )}
          {isAuthenticated && user.role === "admin" && (
            <Route exact path="/admin/user/:id" element={<UpdateUser />} />
          )}
          {isAuthenticated && user.role === "admin" && (
            <Route exact path="/admin/reviews" element={<ProductReviews />} />
          )}
          <Route element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
