import React, { Fragment, useState } from "react";
import "./Header.css";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";
import { MdDashboard } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { MdExitToApp } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction.js";
import { useDispatch, useSelector } from "react-redux";
// import SpeedDialIcon from "@mui/material/SpeedDialIcon";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const history = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const options = [
    { icon: <FaListAlt />, name: "Orders", func: orders },
    { icon: <IoMdPerson />, name: "Profile", func: account },
    { icon: <FaCartShopping style={{color:cartItems.length>0 ? "tomato" : "unset"}}/>, name: `Cart(${cartItems.length})`, func: cart },
    { icon: <MdExitToApp />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <MdDashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    history("/admin/dashboard");
  }
  function orders() {
    history("/orders");
  }
  function account() {
    history("/account");
  }
  function cart() {
    history("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully!");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        style={{ zIndex: "11" }}
        className="speedDial"
        ariaLabel="SpeedDial toolTip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
