import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";

import apiCall from "../Utils/ApiCall";
import URL from "../Utils/Url";
import "../Product/style.css";

const images = [
  "https://m.media-amazon.com/images/I/71d1ytcCntL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/61uA2UVnYWL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/61uA2UVnYWL._SL1500_.jpg",
];

const sampleDescription = `Custom Mediatek Dimensity 7200 Pro Processor
                            Phone (2a) is fuelled by the custom Dimesity 
                            7200 Pro chipset. Co-engineered between Nothing 
                            and MediaTek to deliver the best performance with
                            optimal power consumption. Do more whilst using less
                              thanks to game-changing efficiency from the 8-core 
                              4nm TSMC 2nd Generation process, with clocking speeds 
                              of up to 2.8 GHz for multi-tasking to the max. 
                              Plus get up to 20 GB RAM with 8 GB RAM Booster.`;

const ProductDescription = () => {
  const productId =
    window.location.href.split("/")[window.location.href.split("/").length - 1];
  const [productInfo, setProductInfo] = useState();

  const fetchProductInfo = async (productId) => {
    try {
      const productInfo = await apiCall("GET", URL.PRODUCTS + `/${productId}`);
      const data = await productInfo.data.data;
      setProductInfo(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProductInfo(productId);
  }, [productId]);
  return (
    <div className="product-desc">
      {productInfo ? (
        <Grid id="product-card" container spacing={2}>
          <Grid className="product-img" item xs={12} sm={6}>
            <img
              src={images[Math.floor(Math.random() * (2 - 0 + 1)) + 0]}
              alt={productInfo.name}
              style={{ maxWidth: "80%", height: "auto" }}
            />
          </Grid>
          <Grid id="product-details" item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>
              {productInfo.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Brand: {productInfo.model}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Description: {sampleDescription}
            </Typography>
            <Typography variant=" ">
              Stock:
              {productInfo.availabilty > 0 ? (
                <span style={{ color: "green" }}> Available</span>
              ) : (
                <span style={{ color: "red" }}>Not Available</span>
              )}
            </Typography>
            <Typography variant=" ">
              Rating:
              {"⭐".repeat(productInfo.rating)}
            </Typography>
            <div className="product-operation">
              <Button variant="contained">Add to Cart</Button>
              <Button variant="contained">Buy Now</Button>
            </div>
          </Grid>
        </Grid>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};

export default ProductDescription;
