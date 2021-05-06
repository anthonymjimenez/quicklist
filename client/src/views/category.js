import React, { useEffect, useContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ItemContext } from "../context/Items/ItemContext";
import ItemList from "../containers/item-list";
import AddItem from "../components/add-item";
import { useAuth0 } from "@auth0/auth0-react";
const Category = () => {
  const {
    user: { sub },
  } = useAuth0();
  let { id } = useParams();
  let { categories, oneCategory } = useContext(ItemContext);
  let [category, setCategory] = useState([]);
  useEffect(() => {
    let found = categories.find((cat) => {
      return cat._id === id;
    });

    setCategory(found);
  }, [categories]);

  return (
    <>
      {console.log(category)}
      {/* <AddItem category={category} /> */}
      Category: {category?.title}
      {/* <ItemList items={category?.items} /> */}
    </>
  );
};

export default Category;
