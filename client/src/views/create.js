import ItemForm from "../containers/item-form";
import { ItemContext } from "../context/Items/ItemContext";
import React, { useContext, useEffect } from "react";
import CategoryList from "../containers/category-list";
const Create = () => {
  const { newlyUpdatedCategories } = useContext(ItemContext);

  return (
    <>
      <h3>Add new Item</h3>
      <ItemForm />
      <h3>Newly Updated </h3>

      <CategoryList categories={newlyUpdatedCategories} />
    </>
  );
};
export default Create;
