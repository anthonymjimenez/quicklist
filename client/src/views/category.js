import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemContext } from "../context/Items/ItemContext";
import ItemList from "../containers/item-list";
import AddItemFromCategory from "../components/add-item-from-category";

const Category = () => {
  let { id } = useParams();
  let { categories, itemError, clearErrors } = useContext(ItemContext);
  let [category, setCategory] = useState([]);
  let [message, setMessage] = useState("");

  useEffect(() => {
    let found = categories.find((cat) => {
      return cat._id === id;
    });
    setCategory(found);
  }, [categories]);

  useEffect(() => {
    if (itemError.id === "POST_ITEM_ERROR") {
      setMessage(itemError.message);
    }

    console.log(itemError);
  }, [itemError]);

  return (
    <>
      {console.log("category", category)}
      <AddItemFromCategory category={category} clearErrors={clearErrors} />
      Category: {category?.title}
      <ItemList items={category?.items} />
    </>
  );
};

export default Category;
