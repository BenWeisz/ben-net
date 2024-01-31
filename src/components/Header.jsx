import React from "react";
import { Link } from "react-router-dom";
import "../style/header.css";

import { FaGithub, FaEnvelope } from "react-icons/fa";

const Header = () => {
  return (
    <div className="headerContainer">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to="/">
          <h1 className="headerTitle">Ben (Bence) Weisz</h1>
        </Link>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Link target="_blank" to="https://github.com/BenWeisz">
            <FaGithub
              style={{ color: "white", margin: "0rem 0.25rem" }}
              size={20}
            />
          </Link>
          <Link to="mailto:benwdev@proton.me">
            <FaEnvelope
              style={{ color: "white", margin: "0rem 0.25rem" }}
              size={20}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
