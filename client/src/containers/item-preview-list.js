import { ItemContext } from "../context/Items/ItemContext";
import ItemPreview from "../components/item-preview";
import React, { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ItemPreviewList = () => {
  const { categories, getCategories } = useContext(ItemContext);
  let {
    user: { sub },
  } = useAuth0();
  useEffect(() => {
    getCategories(sub);
  }, []);

  return (
    <>
      Item Preview List
      {console.log("cat", categories)}
      {categories?.categories?.map((category) => (
        <h5>{category.title}</h5>
      ))}
    </>
  );
};

export default ItemPreviewList;
