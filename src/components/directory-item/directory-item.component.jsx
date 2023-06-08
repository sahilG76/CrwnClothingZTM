import { Link } from "react-router-dom";

import { DirectoryItemContiner } from "./directory-item.styles.jsx";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <DirectoryItemContiner to={`shop/${title}`}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </DirectoryItemContiner>
  );
};

export default DirectoryItem;
