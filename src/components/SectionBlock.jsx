import React, { forwardRef } from "react";
import Proptypes from "prop-types";

import "../index.css";
import "../style/section.css";

const SectionBlock = forwardRef(({ title, upper, children }, ref) => {
  const upperStyle = upper ? { textTransform: "uppercase" } : {};

  return (
    <div ref={ref} style={{ padding: "1rem", ...upperStyle }}>
      {children}
      <h1
        className={(() => {
          return upper
            ? "tert-color-text title-lg"
            : "tert-color-text title-sm";
        })()}
      >
        {title}
      </h1>
      <hr className="bar" />
    </div>
  );
});

SectionBlock.displayName = "SectionBlock";
SectionBlock.propTypes = {
  title: Proptypes.string,
  upper: Proptypes.bool,
  children: Proptypes.object,
};

export default SectionBlock;
