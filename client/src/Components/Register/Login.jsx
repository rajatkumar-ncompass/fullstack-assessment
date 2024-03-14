import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// import Input from "../AtomComponents/Input";
import { TextField, Alert } from "@mui/material";
import Button from "../AtomComponents/Button";
import "../Register/RegisterStyle.css";
import { setLocalStorageItem } from "../../Utils/Lib";
import URL from "../../Utils/Url";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (username.length === 0 || password.length === 0) {
        Swal.fire({
          title: "Login Failed !",
          text: "All Field Required",
          icon: "error",
        });
        return;
      }
      const loginResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}` + URL.LOGIN_USER,
        {
          email: username,
          password: password,
        }
      );
      if (loginResponse.status === 200) {
        setLocalStorageItem("token", loginResponse.data.data.data.token);
        const result = await Swal.fire({
          text: "Login successfully!",
          icon: "success",
        });
        if (result.isConfirmed) {
          navigate("/");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Login Failed !",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <form className="login-form">
      <TextField
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        className={"UserNameField"}
        style={{ marginBottom: "10px", marginRight: "10px" }}
        type="text"
        placeholder="Enter Username"
      />

      <TextField
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="PasswordField"
        style={{ marginBottom: "10px", marginRight: "10px" }}
        type="password"
        placeholder="Enter Password"
      />
      <Button
        type={"submit"}
        onClickBehaviour={handleLogin}
        class={"login-submit-btn"}
        buttonText={"Login"}
      />
    </form>
  );
};

export default Login;
