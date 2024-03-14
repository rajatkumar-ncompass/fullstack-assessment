import React, { useEffect, useState } from "react";
import { fetchLocalStorageItem } from "../Utils/Lib";
import { useNavigate } from "react-router-dom";

import { Pagination } from "@mui/material";

import apiCall from "../Utils/ApiCall";
import URL from "../Utils/Url";
import OrderComponent from "../Components/Profile/OrderComponent";

const Profile = () => {
  const [pageApi, setPageApi] = useState(1);
  const token = fetchLocalStorageItem("token");
  const [query, setQuery] = useState("?");

  const handleSort = (field, checkOrder) => {
    checkOrder === "desc"
      ? fetchOrders(query + `sort=${field}_DESC`)
      : fetchOrders(query + `sort=${field}_ASC`);
  };

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async (query) => {
    try {
      const orderResponse = await apiCall(
        "POST",
        URL.ORDERS + query + "&page=" + pageApi
      );
      const data = await orderResponse.data.data;
      if (orderResponse.status === 200) {
        setOrders(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders(query);
    if (!token) {
      navigate("/auth");
    }
  }, []);
  return (
    <div>
      <div className="sort-filter">
        <div className="sort">
          <p
            onClick={() => {
              handleSort("amount", "desc");
            }}
          >
            Price: High to Low
          </p>
          <p
            onClick={() => {
              handleSort("amount", "desc");
            }}
          >
            Price: High to Low
          </p>
        </div>
      </div>
      {orders ? (
        orders.map((key) => {
          return <OrderComponent key={key.order_id} orders={key} />;
        })
      ) : (
        <p>Loading.....</p>
      )}
      <div className="paginationDiv">
        <Pagination
          count={1}
          onChange={(e, value) => setPageApi(value)}
        ></Pagination>
      </div>
    </div>
  );
};

export default Profile;
