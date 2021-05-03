import { ItemContext } from "../context/Items/ItemContext";
import Item from "../components/item";
import React, { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ItemList = () => {
  const { categories, getCategories } = useContext(ItemContext);
  let {
    user: { sub },
  } = useAuth0();
  useEffect(() => {
    getCategories(sub);
  }, []);

  return (
    <>
      {console.log("items", categories)}
      {/* {items.map((item) => (
        <Item item={item} />
      ))} */}
    </>
  );
};

export default ItemList;
