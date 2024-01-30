import React from "react";
import Proptypes from "prop-types";

import "../style/image.css"

const ImageBlock = ({ image_path, alt_text }) => {
    return <div style={{ padding: "1rem" }}>
        <img class="image-block" src={image_path} alt={alt_text} />
    </div>;
};

ImageBlock.propTypes = {
    image_path: Proptypes.string,
    alt_text: Proptypes.string
};

export default ImageBlock;
