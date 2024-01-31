import React, { useState, useEffect } from "react";
import Proptypes from "prop-types";
import _ from "lodash";

import "../index.css";
import "../style/text.css"

const TextBlock = ({ block }) => {
  const [splitContent, setSplitContent] = useState([]);

  useEffect(() => {
    const content = block.content.split("***");
    setSplitContent(content.map((section) => ({ id: _.uniqueId(), section })));
  }, [block.content]);

  // Generated via ChatGPT
  const parseStringWithLinks = (inputString) => {
    const regex = /\[(.*?)\]\((.*?)\)/g; // [link name](https://www.google.com/)
    let output = [];
    let lastIndex = 0;
    let match;
  
    // Use regex to find patterns [text](http link) in the input string
    while ((match = regex.exec(inputString)) !== null) {
      // Add text before the match as plain text
      output.push(<span key={lastIndex}>{inputString.substring(lastIndex, match.index)}</span>);
  
      // Add the link as an inline link
      const text = match[1];
      const link = match[2];
      output.push(
        <a class="link-block quat-color-text" key={match.index} href={link} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      );
  
      // Update lastIndex to continue searching for the next match
      lastIndex = match.index + match[0].length;
    }
  
    // Add the remaining text after the last match as plain text
    output.push(<span key={lastIndex}>{inputString.substring(lastIndex)}</span>);
  
    // Wrap the segments in a paragraph tag
    return <>{output}</>;
  };

  return (
    <div style={{ padding: "0.5rem 1rem 0.5rem 1rem" }} key={block.id}>
      <p style={{ textIndent: "2rem" }}>
        {splitContent.map((item, i) => {
          if (i % 2 === 1) {
            return (
              <strong key={item.id} className="quat-color-text">
                {item.section}
              </strong>
            );
          } else {
            return parseStringWithLinks(item.section);
          }
        })}
      </p>
    </div>
  );
};

TextBlock.propTypes = {
  block: Proptypes.object,
};

export default TextBlock;
