import React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

import "../NavBar/Nav.css";
import { fetchLocalStorageItem } from "../../Utils/Lib";

const Nav = () => {
  const token = fetchLocalStorageItem("token");
  const navigate = useNavigate();

  const hanleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleOrder = () => {
    navigate("/profile");
  };

  const handleAuth = () => {
    navigate("/auth");
  };

  return (
    <div className="nav-bar">
      <Link to="/">
        <img src="https://i.imgur.com/3SqHspY.png " alt="app-logo"></img>
      </Link>
      <div className="action-div">
        {token ? (
          <>
            <Button
              variant="contained"
              onClick={handleOrder}
              className="order-btn"
              style={{ marginRight: "10px" }}
            >
              Profile
            </Button>

            <Button
              variant="contained"
              onClick={hanleLogout}
              className="logut-btn"
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={handleAuth}
            className="login-btn"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Nav;
