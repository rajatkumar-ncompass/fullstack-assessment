import React from "react";
import { Checkbox } from "@mui/material";

const ProductFilter = ({ filtername, check, filter, handleClick }) => {
  return (
    <div className="check-div">
      <Checkbox
        checked={check}
        onChange={() => {
          handleClick(filter);
        }}
        inputProps={{ "aria-label": "controlled" }}
      />
      <p>{filtername}</p>
    </div>
  );
};

export default ProductFilter;
