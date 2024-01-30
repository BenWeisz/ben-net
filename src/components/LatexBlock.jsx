import React from "react";
import Proptypes from "prop-types";

import "../../node_modules/katex/dist/katex.min.css";
import Latex from "react-latex-next";

const LatexBlock = ({ block }) => {
  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <Latex>{block.content}</Latex>
      <b />
    </div>
  );
};

LatexBlock.propTypes = {
  block: Proptypes.object,
};

export default LatexBlock;
