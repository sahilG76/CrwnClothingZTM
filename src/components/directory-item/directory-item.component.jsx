import { Link } from "react-router-dom";

import {
  BackgroundImage,
  Body,
  DirectoryItemContiner,
} from "./directory-item.styles.jsx";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <DirectoryItemContiner to={`shop/${title}`}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContiner>
  );
};

export default DirectoryItem;
