import ItemCard from "../components/item-card";
import React from "react";

const ItemList = ({ items, isEdit = false }) => {
  return (
    <>
      {items?.map((item) => (
        <>
          {isEdit && <input></input>}
          <ItemCard item={item} />
        </>
      ))}
      )
    </>
  );
};

export default ItemList;
