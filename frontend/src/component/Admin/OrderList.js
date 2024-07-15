import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_SUCCESS } from "../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row["status"] === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      minWidth: 150,
      type: "number",
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      type: "number",
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.row["id"]}`}>
              <MdEdit />
            </Link>
            <Button onClick={() => deleteOrderHandler(params.row["id"])}>
              <MdDelete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order deleted successfully!");
      history("/admin/orders");
      dispatch({ type: DELETE_ORDER_SUCCESS });
    }

    dispatch(getAllOrders());
  }, [error, alert, dispatch, history, isDeleted, deleteError]);

  return (
    <Fragment>
      <MetaData title={"All Orders - Admin"} />
      <div className="dashboard">
        <Sidebar />

        <div className="productListContainer">
          <h1 id="productListHeading">All Orders</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            className="productListTable"
            // autoHeight
            autoPageSize
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
