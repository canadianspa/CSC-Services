import React from "react";
import "./Shared.css";

function Header({ children, dark }) {
  return <div className={dark ? "header dark" : "header"}>{children}</div>;
}

export default Header;
