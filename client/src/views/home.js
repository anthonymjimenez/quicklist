import React, { Fragment } from "react";
import { Media } from "reactstrap";
import PublicItem from "../components/public-item";

const Home = () => {
  return (
    <div className="home-page">
      <Media
        object
        src="https://i.imgur.com/jG1INcW.png"
        alt="Generic placeholder image"
      />
      <h3>Create shopping list seamlessly with Quicklist</h3>
      <PublicItem />
    </div>
  );
};

export default Home;
