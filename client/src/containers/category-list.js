import { ItemContext } from "../context/Items/ItemContext";
import CategoryPreview from "../components/category-preview";
import React, { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const CategoryList = () => {
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
      {categories?.map((category) => (
        <h5>{category.title}</h5>
      ))}
    </>
  );
};

export default CategoryList;
