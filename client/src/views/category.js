import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemContext } from "../context/Items/ItemContext";
import ItemList from "../containers/item-list";
import AddItemFromCategory from "../components/add-item-from-category";
import ErrorMessage from "../components/error-message";
import { IoPencilSharp } from "react-icons/io5";

const Category = () => {
  let { id } = useParams();
  let { categories, itemError, clearErrors } = useContext(ItemContext);
  let [category, setCategory] = useState([]);
  let [message, setMessage] = useState("");
  let [edit, setEdit] = useState(false);
  useEffect(() => {
    clearErrors();
    setMessage("");
  }, []);

  useEffect(() => {
    let found = categories.find((cat) => {
      return cat._id === id;
    });
    setCategory(found);
  }, [categories, id]);

  useEffect(() => {
    itemError.id === "POST_ITEM_ERROR"
      ? setMessage(itemError.message)
      : setMessage(false);

    console.log(itemError);
  }, [itemError]);

  return (
    <>
      {console.log("category", category)}
      <AddItemFromCategory category={category} clearErrors={clearErrors} />
      <ErrorMessage message={message} />
      Category: {category?.title}
      <ItemList items={category?.items} />
      <button onClick={() => (edit ? setEdit(false) : setEdit(true))}>
        <IoPencilSharp />
      </button>
    </>
  );
};

export default Category;
