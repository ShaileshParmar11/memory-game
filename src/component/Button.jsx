import React from "react";

function Button({ handleClick, disabled, title }) {
  return (
    <button className="btn" onClick={handleClick} disabled={disabled}>
      {title}
    </button>
  );
}

export default Button;
