import React from "react";
import "./Shared.css";

function Header({ children, dark, style }) {
  return (
    <div className={dark ? "header dark" : "header"} style={style}>
      {children}
    </div>
  );
}

export default Header;
