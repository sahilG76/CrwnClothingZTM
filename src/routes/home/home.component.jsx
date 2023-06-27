import { Outlet } from "react-router-dom";

import CategoryGrid from "../../components/directory/directory.component";

import "../../categories.styles.scss";
import Directory from "../../components/directory/directory.component";

const Home = () => {
  return (
    <div>
      <Outlet />
      <Directory />
    </div>
  );
};

export default Home;
