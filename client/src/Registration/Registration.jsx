import React, { useState } from "react";

import Register from "../Components/Register/Register";
import Login from "../Components/Register/Login";
import "./RegisterPageStyle.css";


const Registration = () => {
  const [isRegister, setIsRegister] = useState(true);

  const handleRegisterSuccess = () => {
    setIsRegister(false);
  };

  return (
    <div className="authentication-page">
      <div className="authenticate-div">
        <div className="switch-auth">
          <div
            style={{
              borderBottom: isRegister === true ? "2px solid black" : "0px",
            }}
            className="register-btn"
            onClick={() => {
              setIsRegister(true);
            }}
          >
            Register
          </div>
          <div
            style={{
              borderBottom: isRegister === true ? "1px" : "2px solid black",
            }}
            onClick={() => {
              setIsRegister(false);
            }}
            className="login-btn"
          >
            Login
          </div>
        </div>
        <div className="main-auth-div">
          {isRegister === true ? (
            <Register onRegisterSuccess={handleRegisterSuccess} />
          ) : (
            <Login />
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
