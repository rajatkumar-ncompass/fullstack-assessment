import React from "react";
import { Select, MenuItem } from "@mui/material";

const RatingForm = ({ rating, onChangeHandler }) => {
  return (
    <div>
      <Select
        value={rating}
        placeholder="Rating"
        onChange={onChangeHandler}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select Rating
        </MenuItem>
        <MenuItem value={1}>1 ⭐</MenuItem>
        <MenuItem value={2}>2 ⭐</MenuItem>
        <MenuItem value={3}>3 ⭐</MenuItem>
        <MenuItem value={4}>4 ⭐</MenuItem>
        <MenuItem value={5}>5 ⭐</MenuItem>
      </Select>
    </div>
  );
};

export default RatingForm;
