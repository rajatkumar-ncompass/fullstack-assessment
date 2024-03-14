import React from "react";

import "../../style.css";

const Input = (props) => {
  return (
    <div className="input-field">
      <input
        className={props.class}
        placeholder={props.placeholder}
        type={props.type}
        onChange={(e) => {
          props.populateData(e.target.value);
        }}
      ></input>
    </div>
  );
};

export default Input;
