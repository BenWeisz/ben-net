import React from "react";

import "../index.css";
import "../style/page.css";
import "../style/contents.css";
import "../style/section.css";
import Header from "../components/Header";
import HomePageEntry from "../components/HomePageEntry";

const HomePage = () => {
  return (
    <div className="first-color">
      <Header />
      <div className="vert-container">
        <div className="vert-contents">
          <div style={{ padding: "1rem" }}>
            <h1 className="title-lg tert-color-text">Posts</h1>
            <hr className="bar" style={{ marginBottom: "0.5rem" }} />
            <HomePageEntry
              name="Sample zxcv sdd"
              date="2024-01-05"
              path="/sample-zxcv-sdd"
            />
            <hr className="bar" style={{ marginTop: "0.5rem" }} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
