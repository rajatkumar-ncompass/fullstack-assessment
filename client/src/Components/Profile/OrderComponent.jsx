import React, { useState } from "react";
import { Grid, Typography, Chip, Button } from "@mui/material";
import "../Profile/style.css";

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
};

const OrderComponent = (props) => {
  const { amount, status, createdAt, updatedAt, product_details, address } =
    props.orders;
  const [showProducts, setShowProducts] = useState(false);
  const createdDate = new Date(createdAt);
  const updatedDate = new Date(updatedAt);

  const addressDetails =
    address.locality + " " + address.state + " " + address.country;

  const createDate = createdDate.toLocaleDateString("en-US", options);
  const updateDate = updatedDate.toLocaleDateString("en-US", options);

  const handleShowProducts = () => {
    setShowProducts(!showProducts);
  };

  return (
    <div>
      <Grid className="order-info" container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Amount:</Typography>
          <Typography variant="body1">Status:</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">{amount}</Typography>
          <Chip
            label={status}
            color={status === "Active" ? "success" : "default"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Created At:</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">{createDate}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Updated At:</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">{updateDate}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Address</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div>
            <Typography variant="body1">{addressDetails}</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" onClick={handleShowProducts}>
            {showProducts ? "Hide" : "Show Products"}
          </Button>
        </Grid>
      </Grid>

      {showProducts
        ? product_details.map((key) => {
            return (
              <div className="product-info">
                <Typography>{key.name}</Typography>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default OrderComponent;
