import React from "react";
import "./navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="container nav-container">
        <div className="nav-logo">
            <h2 className="first-logo">Taxidermy</h2>
            <h2>Management</h2>
        </div>
        <div className="nav-button">
            {/* <button className="butt-logo">SIGN UP</button> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
