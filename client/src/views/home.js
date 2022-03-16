import React, { useContext, useEffect, useState } from "react";
import { Media } from "reactstrap";
import ItemCard from "../components/item-card";
import PublicItem from "../forms/public-item";
import { ItemContext } from "../context/Items/ItemContext";
import ErrorMessage from "../components/error-message";
import Loading from "../components/loading";

const Home = () => {
  let { publicItem, itemError, loading } = useContext(ItemContext);
  let [message, setMessage] = useState(false);
  useEffect(() => {
    itemError.id === "PUBLIC_ERROR"
      ? setMessage(itemError.message)
      : setMessage(false);

    console.log(itemError);
  }, [itemError]);
  return (
    <div className="home-page">
      <Media
        object
        src="https://i.imgur.com/jG1INcW.png"
        alt="Quicklist Icon"
      />
      <h2 className="mb-2">
        Use web scraping technology to fetch and save descriptive details using
        nothing but URLS!
      </h2>

      <PublicItem />
      <br />
      {loading && <Loading loading={loading} />}
      {}
      <ErrorMessage message={message} />
      {publicItem && (
        <>
          <h4>
            {" "}
            Create an Account to start creating shopping lists seamlessly with
            Quicklist{" "}
          </h4>
          <ItemCard item={publicItem} isPublic={true} />{" "}
        </>
      )}
    </div>
  );
};

export default Home;
