import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    {
      field: "stock",
      type: "number",
      headerName: "Stock",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      type: "number",
      headerName: "Price",
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
            <Link to={`/admin/product/${params.row["id"]}`}>
              <MdEdit />
            </Link>
            <Button onClick={() => deleteProductHandler(params.row["id"])}>
              <MdDelete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
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
      alert.success("Product deleted successfully!");
      history("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [error, alert, dispatch, history, isDeleted, deleteError]);

  return (
    <Fragment>
      <MetaData title={"All Products - Amin"} />
      <div className="dashboard">
        <Sidebar />

        <div className="productListContainer">
          <h1 id="productListHeading">All Products</h1>
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

export default ProductList;
