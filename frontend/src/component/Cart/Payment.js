/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import "./Payment.css";
import { createOrder, clearErrors } from "../../actions/orderAction.js";
import { useNavigate } from "react-router-dom";
// import { Typography } from "@material-ui/core";
// import {
// CardNumberElement,
// CardCvcElement,
// CardExpiryElement,
// useStripe,
// useElements,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
// import CreditCardIcon from "@material-ui/icons/CreditCard";
// import EventIcon from "@material-ui/icons/Event";
// import VpnKeyIcon from "@material-ui/icons/VpnKey";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const history = useNavigate();
  const alert = useAlert();
  // const stripe = useStripe();
  // const elements = useElements();
  // const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);
  // const { user } = useSelector((state) => state.user);

  // const paymentData = {
  // amount: Math.round(orderInfo.totalPrice * 100),
  // };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // payBtn.current.disabled = true;

    try {
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      // const { data } = await axios.post(
      //   "/api/v1/payment/process",
      //   paymentData,
      //   config
      // );

      // const client_secret = data.client_secret;

      // if (!stripe || !elements) return;

      // const result = await stripe.confirmCardPayment(client_secret, {
      //   payment_method: {
      //     card: elements.getElement(CardNumberElement),
      //     billing_details: {
      //       name: user.name,
      //       email: user.email,
      //       address: {
      //         line1: shippingInfo.address,
      //         city: shippingInfo.city,
      //         state: shippingInfo.state,
      //         postal_code: shippingInfo.pinCode,
      //         country: shippingInfo.country,
      //       },
      //     },
      //   },
      // });

      // if (result.error) {
      //   payBtn.current.disabled = false;

      //   alert.error(result.error.message);
      // } else {
      //   if (result.paymentIntent.status === "succeeded") {
      //     order.paymentInfo = {
      //       id: result.paymentIntent.id,
      //       status: result.paymentIntent.status,
      //     };

      order.paymentInfo = {
        id: "paymentId",
        status: "succeeded",
      };

      dispatch(createOrder(order));
      alert.success("Payment done successfully!");
      history("/success");
      // } else {
      // alert.error("There's some issue while processing payment ");
      // }
      // }
    } catch (error) {
      // payBtn.current.disabled = false;
      // alert.error(error.response.data.message);
      alert.error("There's some issue while processing payment: ", error);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title={"Payment"} />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <button onClick={(e) => submitHandler(e)} className="payBtn">
          Pay - ₹{orderInfo.totalPrice}
        </button>
      </div>
    </Fragment>
  );
};

export default Payment;
