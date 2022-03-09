import ItemForm from "../forms/create-form-tabs";
import { ItemContext } from "../context/Items/ItemContext";
import React, { useContext, useEffect } from "react";
import CategoryList from "../containers/category-list";
const Create = () => {
  const { newlyUpdatedCategories } = useContext(ItemContext);

  return (
    <>
      <h3 className="mb-2">Add new Item</h3>
      <ItemForm />
      {newlyUpdatedCategories.length > 0 && (
        <h3 className="mt-2">Newly Updated </h3>
      )}

      <CategoryList categories={newlyUpdatedCategories} />
    </>
  );
};
export default Create;
