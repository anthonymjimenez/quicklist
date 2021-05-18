import React from "react";
import { Media } from "reactstrap";

const ItemShow = ({ item }) => {
  return (
    <div>
      <h2>
        {console.log(item)}
        {item?.title} (${item?.price}){" "}
      </h2>
      <br />
      <div style={{ width: "90%" }}>
        <Media
          style={{ width: "85%" }}
          object
          src={item?.image}
          alt="Quicklist Icon"
        />
      </div>
      <img src={item?.logo} alt="Item logo" /> {item?.hostname}
      <p>{item?.description}</p>
    </div>
  );
};

export default ItemShow;
