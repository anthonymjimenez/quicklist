import { ItemContext } from "../context/Items/ItemContext";
import Item from "../components/item";
import React, { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ItemList = () => {
  const { items, getItems } = useContext(ItemContext);
  let {
    user: { sub },
  } = useAuth0();
  useEffect(() => {
    getItems(sub);
    console.log(0);
  }, []);

  return (
    <>
      {console.log("items", items)}
      {/* {items.map((item) => (
        <Item item={item} />
      ))} */}
    </>
  );
};

export default ItemList;
