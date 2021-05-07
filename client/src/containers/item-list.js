import ItemCard from "../components/item-card";
import React from "react";

const ItemList = ({ items }) => {
  return (
    <>
      {items?.map((item) => (
        <ItemCard item={item} />
      ))}
    </>
  );
};

export default ItemList;
