import React from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";

const HomePageEntry = ({ name, date, path }) => {
  return (
    <div>
      <Link style={{ color: "white" }} to={path}>
        <span>{date}</span>
        <span style={{ marginLeft: "2rem" }}>{name}</span>
      </Link>
    </div>
  );
};

HomePageEntry.propTypes = {
  name: Proptypes.string,
  date: Proptypes.string,
  path: Proptypes.string,
};

export default HomePageEntry;
