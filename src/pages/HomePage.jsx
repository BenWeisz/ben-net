import React from "react";

import "../index.css";
import "../style/page.css";
import "../style/contents.css";
import "../style/section.css";
import Header from "../components/Header";
import HomePageEntry from "../components/HomePageEntry";

const HomePage = () => {
  return (
    <div className="primary-color">
      <Header />
      <div className="vert-container">
        <div className="vert-contents">
          <div style={{ padding: "1rem" }}>
            <h1 className="title-lg tert-color-text">Posts</h1>
            <hr className="bar" style={{ marginBottom: "0.5rem" }} />
            <HomePageEntry name="Ben's Books" date="2024-03-23" path="/bens-books" />
<HomePageEntry name="Symbolic Differentiation: Part 1" date="2024-02-09" path="/symbolic-differentiation-part-1" />
<HomePageEntry name="Designing a blog site" date="2024-01-30" path="/designing-a-blog-site" />
            <hr className="bar" style={{ marginTop: "0.5rem" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
        