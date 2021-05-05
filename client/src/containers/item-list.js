import { ItemContext } from "../context/Items/ItemContext";
import ItemCard from "../components/item-card";
import React, { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ItemList = ({ items }) => {
  return (
    <>
      {console.log("items", items)}
      {items.map((item) => (
        <ItemCard item={item} />
      ))}
    </>
  );
};

export default ItemList;
