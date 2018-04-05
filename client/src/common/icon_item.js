import React from "react";

const IconItem = props => {
  return (
    <div className="icon-item">
      <span hidden={!props.item}>
        <i className={props.iconName} />
      </span>
      <span className={props.item ? "bold-icon-name" : "crossout-icon-name"}>
        {props.text}
      </span>
    </div>
  );
};

export default IconItem;
