import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// import Input from "../AtomComponents/Input";
import { TextField } from "@mui/material";
import Button from "../AtomComponents/Button";
import URL from "../../Utils/Url";
import "./RegisterStyle.css";

const Register = (props) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [openAddress, setOpenAddress] = useState(false);
  const [street, setStreet] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const handleOpenAddress = () => {
    setOpenAddress(!openAddress);
  };

  const handleRegister = async () => {
    try {
      if (username.length === 0 || password.length === 0 || name.length === 0) {
        Swal.fire({
          title: "Registration Failed !",
          text: "All Field Required",
          icon: "error",
        });
        return;
      }
      const registerResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}` + URL.REGISTER_USER,
        {
          name: name,
          email: username,
          street: street,
          locality: locality,
          state: state,
          city: city,
          country: country,
          password: password,
        }
      );
      if (registerResponse.status === 200) {
        const result = await Swal.fire({
          text: "Registered successfully !",
          icon: "success",
        });

        if (result.isConfirmed) {
          props.onRegisterSuccess();
        }
      }
    } catch (error) {
      Swal.fire({
        text: "Registered Failed !",
        icon: "error",
      });
    }
  };

  return (
    <form className="register-form">
      <div className="user-details">
        <div className="user-details-group-1">
          <TextField
            onChange={(e) => {
              setName(e.target.value);
            }}
            variant="outlined"
            type="text"
            placeholder="Enter Name"
            style={{ marginBottom: "10px", marginRight: "10px" }}
          ></TextField>
          <TextField
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            variant="outlined"
            style={{ marginBottom: "10px", marginRight: "10px" }}
            placeholder="Enter Username"
          ></TextField>
        </div>

        <TextField
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          style={{ marginBottom: "10px" }}
          variant="outlined"
          type="password"
          placeholder="Enter Password"
        ></TextField>
      </div>
      <Button
        type={"click"}
        onClickBehaviour={handleOpenAddress}
        class={"openAddressBtn"}
        buttonText={openAddress ? "Close Adddress" : "Add Address"}
      />
      {openAddress ? (
        <>
          <div className="address-group-1">
            <TextField
              onChange={(e) => {
                setStreet(e.target.value);
              }}
              style={{ marginBottom: "10px", marginRight: "10px" }}
              variant="outlined"
              type="text"
              placeholder="Enter Street"
            ></TextField>
            <TextField
              onChange={(e) => {
                setLocality(e.target.value);
              }}
              style={{ marginBottom: "10px", marginRight: "10px" }}
              variant="outlined"
              type="text"
              placeholder="Enter Locality"
            ></TextField>
          </div>
          <div className="group-2">
            <TextField
              onChange={(e) => {
                setCity(e.target.value);
              }}
              style={{ marginBottom: "10px", marginRight: "10px" }}
              variant="outlined"
              type="text"
              placeholder="Enter City"
            ></TextField>
            <TextField
              onChange={(e) => {
                setState(e.target.value);
              }}
              style={{ marginBottom: "10px", marginRight: "10px" }}
              variant="outlined"
              type="text"
              placeholder="Enter State"
            ></TextField>
          </div>

          <TextField
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            style={{ marginBottom: "10px" }}
            variant="outlined"
            type="text"
            placeholder="Enter Country"
          ></TextField>
        </>
      ) : null}
      <Button
        type={"submit"}
        onClickBehaviour={handleRegister}
        class={"registerSubmitBtn"}
        buttonText={"Register"}
      />
    </form>
  );
};

export default Register;
