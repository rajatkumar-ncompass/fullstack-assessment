import React from "react";

import "../../style.css";

const Button = (props) => {
  return (
    <div className="button-component">
      <button
        onClick={(e) => {
          e.preventDefault();
          props.onClickBehaviour();
        }}
        className={props.class}
        type={props.type}
      >
        {props.buttonText}
      </button>
    </div>
  );
};

export default Button;
