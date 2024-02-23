import React from "react"
import DesigningABlogSitePage from "./DesigningABlogSitePage";
import SymbolicDifferentiationPartPage from "./SymbolicDifferentiationPartPage";
import { useLocation } from "react-router-dom";

import "../index.css";
import "../style/page.css";

import Header from "../components/Header";

const PostPage = () => {
  const path = useLocation().pathname;
  const pages = {
    "/designing-a-blog-site": <DesigningABlogSitePage/>,
    "/symbolic-differentiation-part-1": <SymbolicDifferentiationPartPage/>,
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