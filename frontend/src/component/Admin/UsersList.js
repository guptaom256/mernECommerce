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
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import Loader from "../layout/Loader/Loader";

const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();
  const { error, users, loading } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row["role"] === "admin" ? "greenColor" : "redColor";
      },
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
            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <Link to={`/admin/user/${params.row["id"]}`}>
                  <MdEdit />
                </Link>
                <Button onClick={() => deleteUserHandler(params.row["id"])}>
                  <MdDelete />
                </Button>
              </Fragment>
            )}
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
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
      alert.success(message);
      history("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [error, alert, dispatch, history, isDeleted, deleteError, message]);

  return (
    <Fragment>
      <MetaData title={"All Users - Amin"} />
      <div className="dashboard">
        <Sidebar />

        <div className="productListContainer">
          <h1 id="productListHeading">All Users</h1>
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

export default UsersList;
