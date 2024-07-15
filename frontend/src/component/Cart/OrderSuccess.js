import React from "react";
import "./OrderSuccess.css";
import { Typography } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <FaCheckCircle />
      <Typography>Your order has been placed successfully!</Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
