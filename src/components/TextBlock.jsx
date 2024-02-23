import React from "react";
import Proptypes from "prop-types";

import Latex from "react-latex-next";

import "../index.css";
import "../style/text.css";

const TextBlock = ({ block }) => {
  const parseSubStrings = (inputString) => {
    const components = [];
    const regex =
      /(\*\*\*[^*]*\*\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`|\$[^$]+\$|.)/g;

    let match;
    let id = 0;
    while ((match = regex.exec(inputString)) !== null) {
      const matchStr = match[0];
      if (matchStr.startsWith("***") && matchStr.endsWith("***")) {
        components.push(
          <strong key={id} className="quat-color-text">
            {matchStr.substring(3, matchStr.length - 3)}
          </strong>
        );
      } else if (matchStr.startsWith("[") && matchStr.endsWith(")")) {
        const linkParts = matchStr
          .substring(1, matchStr.length - 1)
          .split("](");
        components.push(
          <a
            class="link-block quat-color-text"
            key={id}
            href={linkParts[1]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkParts[0]}
          </a>
        );
      } else if (matchStr.startsWith("`") && matchStr.endsWith("`")) {
        components.push(
          <inlineblock>
            {matchStr.substring(1, matchStr.length - 1)}
          </inlineblock>
        );
      } else if (matchStr.startsWith("$") && matchStr.endsWith("$")) {
        components.push(
          <Latex>{matchStr}</Latex>
        );
      } else {
        components.push(<span>{matchStr}</span>);
      }
      id += 1;
    }

    return <>{components}</>;
  };

  return (
    <div style={{ padding: "0.5rem 1rem 0.5rem 1rem" }} key={block.id}>
      <p style={{ textIndent: "2rem" }}>{parseSubStrings(block.content)}</p>
    </div>
  );
};

TextBlock.propTypes = {
  block: Proptypes.object,
};

export default TextBlock;
