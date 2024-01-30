import React from "react"
import PostTitleGoesHerePage from "./PostTitleGoesHerePage";
import { useLocation } from "react-router-dom";

import "../index.css";
import "../style/page.css";

import Header from "../components/Header";

const PostPage = () => {
  const path = useLocation().pathname;
  const pages = {
    "/post-title-goes-here": <PostTitleGoesHerePage/>,
  };

  const choosePage = () => {
    if (path in pages) {
      const page = pages[path];
      return (
        <div>
          <Header />
          <div className="vert-container">{page}</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="primary-color" style={{ color: "white" }}>
      {choosePage()}
    </div>
  );
};

export default PostPage;