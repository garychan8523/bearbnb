import React from "react";

const Button = props => {
  return (
    <button
      type={props.btnType}
      className={props.btnClass}
      onClick={props.onClick}
    >
      {props.btnText}
    </button>
  );
};

export default Button;
