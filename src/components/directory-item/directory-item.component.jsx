import { useNavigate } from "react-router-dom";

import {
  BackgroundImage,
  Body,
  DirectoryItemContiner,
} from "./directory-item.styles.jsx";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  // const navigate = useNavigate();

  // const onNavigateHandler = () => {
  //   navigate(route);
  //   console.log(`Navigate called on ${route}`);
  // };

  return (
    <DirectoryItemContiner to={route}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContiner>
  );
};

export default DirectoryItem;
