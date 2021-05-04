import { ItemContext } from "../context/Items/ItemContext";
import CategoryPreview from "../components/category-preview";
import React, { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ListGroup } from "reactstrap";
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
      {categories?.map((category) => (
        <CategoryPreview category={category} />
      ))}
    </>
  );
};

export default CategoryList;
