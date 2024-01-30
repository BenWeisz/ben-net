import React from "react";
import Proptypes from "prop-types";

import "../index.css";
import "../style/section-box.css";

const SectionBox = ({ sections, sectionRefs }) => {
  return (
    <div style={{ justifyContent: "center" }}>
      <div className="sectionbox-container quat-color-text">
        <ul className="list-disc">
          {sections.map((item, i) => (
            <li
              style={{ cursor: "pointer" }}
              key={item.id}
              onClick={() => {
                sectionRefs.current[i].scrollIntoView({ behavior: "smooth" });
              }}
            >
              {item.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

SectionBox.propTypes = {
  sections: Proptypes.array,
  sectionRefs: Proptypes.shape({
    current: Proptypes.array,
  }),
};

export default SectionBox;
