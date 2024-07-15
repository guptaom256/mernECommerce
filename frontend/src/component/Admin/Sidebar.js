import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
// import { MdExpandMore } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
import { MdAdd } from "react-icons/md";
// import { MdImportExport } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdRateReview } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={`/admin/dashboard`}>
        <img src={logo} alt="E-Commerce" />
      </Link>

      <Link to={"/admin/dashboard"}>
        <p>
          <MdDashboard /> Dashboard
        </p>
      </Link>

      <Link>
        <SimpleTreeView>
          <TreeItem itemId="1" label="Products">
            <Link to={"/admin/products"}>
              <TreeItem itemId="2" label="All" icon={<MdPostAdd />} />
            </Link>

            <Link to={"/admin/product"}>
              <TreeItem itemId="3" label="Create" icon={<MdAdd />} />
            </Link>
          </TreeItem>
        </SimpleTreeView>
      </Link>

      <Link to={"/admin/orders"}>
        <p>
          <FaListAlt /> Orders
        </p>
      </Link>

      <Link to={"/admin/users"}>
        <p>
          <BsFillPeopleFill /> Users
        </p>
      </Link>

      <Link to={"/admin/reviews"}>
        <p>
          <MdRateReview /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
