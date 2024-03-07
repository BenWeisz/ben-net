import React from "react";
import Proptypes from "prop-types";

import { InlineMath, BlockMath } from "./Latex";

import "../index.css";
import "../style/text.css";

const TextBlock = ({ block }) => {
  const parseSubStrings = (rawString) => {
    const components = [];
    let inputString = rawString.replace(/\s+$/g, '');

    // Handle case were this line is only a latex block
    if (inputString.split("$").length - 1 === 2 && inputString.startsWith("$") && inputString.endsWith("$")) {
      return { component: < BlockMath math = { inputString.slice(1, inputString.length - 1) } />, shouldCenter: false };
    }

    // Mark this text block to be centered
    const shouldCenter = inputString.startsWith("-->");
    if (shouldCenter) {
      inputString = inputString.slice(3, inputString.length);
    }

    // const regex = /(\*\*\*[^*]*\*\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`|\$[^$]+\$|[^*\[\]`$]+|\*\*\*[^\*]+\*\*\*)/g;
    const regex = /(\*\*\*[^*]*\*\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`|\$[^$]+\$|[^*[\]`$]+|\*\*\*[^*]+\*\*\*)/g;

    let match;
    let id = 0;
    while ((match = regex.exec(inputString)) !== null) {
      const matchStr = match[0];
      if (matchStr === "") {
        continue;
      }
      else if (matchStr.startsWith("***") && matchStr.endsWith("***")) {
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
        const mathText = matchStr.slice(1, matchStr.length - 1);
        components.push( <InlineMath math={mathText} />);
      } else {
        components.push(<span>{matchStr}</span>);
      }
      id += 1;
    }

    return { component: <>{components}</>, shouldCenter };
  };

  const parsedStrings = parseSubStrings(block.content);
  const style = parsedStrings.shouldCenter ? { padding: "0.5rem 1rem 0.5rem 1rem", textAlign: "center" } : { padding: "0.5rem 1rem 0.5rem 1rem" };

  return (
    <div style={style} key={block.id}>
      <p style={{ textIndent: "2rem" }}>{parsedStrings.component}</p>
    </div>
  );
};

TextBlock.propTypes = {
  block: Proptypes.object,
};

export default TextBlock;
