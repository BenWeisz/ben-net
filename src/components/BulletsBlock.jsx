import React from "react";
import Proptypes from "prop-types";

const BulletsBlock = ({ block }) => {
  return (
    <div style={{ padding: "0rem 1rem 0rem 3rem" }}>
      <ul className="list-disc">
        {block.content.map((item) => (
          <li key={item.id}>{item.item}</li>
        ))}
      </ul>
      <b />
    </div>
  );
};

BulletsBlock.propTypes = {
  block: Proptypes.object,
};

export default BulletsBlock;
