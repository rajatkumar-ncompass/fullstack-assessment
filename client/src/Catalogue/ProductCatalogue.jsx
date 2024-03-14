import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Slider,
  Grid,
  Pagination,
} from "@mui/material";

import URL from "../Utils/Url";
import apiCall from "../Utils/ApiCall";
import Product from "../Components/Catalogue/Product";
import "../Catalogue/style.css";
import ProductFilter from "../Components/Catalogue/ProductFilter";
import RatingForm from "../Components/Catalogue/RatingForm";

const style = {
  position: "absolute",
  top: "50%",
  display: "flex",
  justifyContent: "center",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  flexDirection: "column",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const images = [
  "https://m.media-amazon.com/images/I/71d1ytcCntL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/41pelTeO6aL._SX300_SY300_QL70_FMwebp_.jpg",
  "https://m.media-amazon.com/images/I/61uA2UVnYWL._SL1500_.jpg",
];

const ProductCatalogue = () => {
  const [pageApi, setPageApi] = useState(1);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("?");
  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [rating, setRating] = useState(null);
  const [minNum, setMinNum] = useState(0);
  const [maxNum, setMaxNum] = useState(1000);
  const [priceRangeValue, setPriceRangeValue] = useState([minNum, maxNum]);
  const minmin = 5000;
  const maxmax = 50000;

  const handlePriceRangeChangeCommited = (event, newValue) => {
    fetchProducts(query + `filter_price=${newValue[0]}-${newValue[1]}`);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setMinNum(newValue[0]);
    setMaxNum(newValue[1]);
    setPriceRangeValue(newValue);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
    setQuery(query + `filter_rating=${event.target.value}&`);
    fetchProducts(query + `filter_rating=${event.target.value}`);
  };

  const fetchProducts = async (query) => {
    try {
      const productResponse = await apiCall(
        "GET",
        URL.PRODUCTS + query + "&page=" + pageApi
      );
      const data = await productResponse.data.data;
      if (productResponse.status === 200) {
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (field, checkOrder) => {
    checkOrder === "desc"
      ? fetchProducts(query + `sort=${field}_DESC`)
      : fetchProducts(query + `sort=${field}_ASC`);
  };

  const handleFilter = (field) => {
    setAvailabilityChecked(true);
    setQuery(query + `filter_${field}=true&`);
    fetchProducts(query + `filter_${field}=true`);
  };

  useEffect(() => {
    fetchProducts(query);
  }, [pageApi]);

  return (
    <div className="product-catalogue">
      <div className="sort-filter">
        <div className="sort">
          <p
            onClick={() => {
              handleSort("name", "asc");
            }}
          >
            Alphabetically
          </p>
          <p
            onClick={() => {
              handleSort("price", "desc");
            }}
          >
            Price: High to Low
          </p>
          <p
            onClick={() => {
              handleSort("price", "asc");
            }}
          >
            Price: Low to High
          </p>

          <p
            onClick={() => {
              handleSort("rating", "desc");
            }}
          >
            Rating: High to Low
          </p>
          <p
            onClick={() => {
              handleSort("rating", "asc");
            }}
          >
            Rating: Low to Low
          </p>
        </div>
        <div className="filter">
          <Button variant="contained" onClick={handleOpenFilter}>
            Filters
          </Button>
        </div>
      </div>

      <div className="filter"></div>
      <Grid container spacing={2}>
        {products ? (
          products.map((key) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={key.id}>
              <Product
                id={key.id}
                image={images[Math.floor(Math.random() * (2 - 0 + 1)) + 0]}
                productName={key.name}
                price={key.price}
                brand={key.model}
              />
            </Grid>
          ))
        ) : (
          <p>Loading....</p>
        )}
      </Grid>

      <div className="paginationDiv">
        <Pagination
          count={160}
          onChange={(e, value) => setPageApi(value)}
        ></Pagination>
      </div>

      <Modal
        open={openFilter}
        onClose={handleCloseFilter}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ProductFilter
            filtername={"Availability"}
            filter={"availability"}
            check={availabilityChecked}
            handleClick={handleFilter}
          ></ProductFilter>

          <p>Rating: </p>
          <RatingForm rating={rating} onChangeHandler={handleRatingChange} />
          <p>Price</p>
          <Slider
            getAriaLabel={() => "Price range"}
            value={priceRangeValue}
            onChange={handlePriceRangeChange}
            onChangeCommitted={handlePriceRangeChangeCommited}
            valueLabelDisplay="auto"
            min={minmin}
            max={maxmax}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ProductCatalogue;
