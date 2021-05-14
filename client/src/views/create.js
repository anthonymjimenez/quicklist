import CategoryList from "../containers/category-list";
import ItemForm from "../components/item-form";
import { ItemContext } from "../context/Items/ItemContext";
import React, { useContext, useEffect } from "react";
const Create = () => {
  const { newlyUpdatedCategories } = useContext(ItemContext);

  useEffect(() => {
    console.log("new updates", newlyUpdatedCategories);
  }, [newlyUpdatedCategories]);
  return (
    <>
      <h3>Add new Item</h3>
      <ItemForm />
      <h3>Newly Updated </h3>

      {console.log(newlyUpdatedCategories)}
    </>
  );
};
export default Create;
