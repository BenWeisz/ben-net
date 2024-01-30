import React from "react";
import Proptypes from "prop-types";

import { CopyBlock, dracula } from "react-code-blocks";
import "../style/code.css";

const CodeBlock = ({ block }) => {
  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="code-block">
          <CopyBlock
            language={block.language}
            text={block.content}
            showLineNumbers={true}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
        </div>
      </div>
      <b />
    </div>
  );
};

CodeBlock.propTypes = {
  block: Proptypes.object,
};

export default CodeBlock;
