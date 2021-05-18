import React, { useContext } from "react";
import { Media } from "reactstrap";
import ItemCard from "../components/item-card";
import PublicItem from "../components/public-item";
import { ItemContext } from "../context/Items/ItemContext";

const Home = () => {
  let { publicItem } = useContext(ItemContext);

  return (
    <div className="home-page">
      <Media
        object
        src="https://i.imgur.com/jG1INcW.png"
        alt="Quicklist Icon"
      />
      <h3>Create shopping list seamlessly with Quicklist</h3>
      <PublicItem />
      <br />
      {publicItem && (
        <>
          <h4> Create an Account to start saving items! </h4>
          <ItemCard item={publicItem} isPublic={true} />{" "}
        </>
      )}
    </div>
  );
};

export default Home;
