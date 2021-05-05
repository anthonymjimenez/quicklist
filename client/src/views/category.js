import React, { useEffect, useContext } from "react";
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
  let { findOneCategory, oneCategory, getCategories } = useContext(ItemContext);

  console.log(oneCategory, id);

  useEffect(() => {
    findOneCategory(id);
  }, []);

  return (
    <>
      <AddItem category={oneCategory} />
      Category: {oneCategory?.title}
      <ItemList items={oneCategory?.items} />
    </>
  );
};

export default Category;
