import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemContext } from "../context/Items/ItemContext";
import ItemList from "../containers/item-list";
import AddItem from "../components/add-item";

const Category = () => {
  let { id } = useParams();
  let { categories, oneCategory } = useContext(ItemContext);
  let [category, setCategory] = useState([]);
  useEffect(() => {
    let found = categories.find((cat) => {
      return cat._id === id;
    });
    console.log("PING");
    setCategory(found);
  }, [categories]);

  return (
    <>
      {console.log("category", category)}
      <AddItem category={category} />
      Category: {category?.title}
      <ItemList items={category?.items} />
    </>
  );
};

export default Category;
