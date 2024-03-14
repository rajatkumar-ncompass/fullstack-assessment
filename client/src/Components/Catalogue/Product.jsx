import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

import "../Catalogue/style.css";
import { useNavigate } from "react-router-dom";

const Product = ({ id, image, productName, price, brand }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`product/${id}`);
  };
  return (
    <Card className="product-card" onClick={handleClick}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={productName}
        style={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {productName}
        </Typography>
        <Typography variant="h6" color="primary">
          Price: {price}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Brand: {brand}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
