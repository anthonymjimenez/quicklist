import { ItemContext } from "../context/Items/ItemContext";
import CategoryPreview from "./category-preview";
import React, { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const { categories } = useContext(ItemContext);

  // useEffect(() => {
  //   getCategories(sub);
  // }, []);

  return (
    <>
      {categories?.map((category) => (
        <Link
          style={{ textDecoration: "none" }}
          to={{
            pathname: `/category/${category._id}`,
          }}
        >
          <CategoryPreview category={category} />
        </Link>
      ))}
    </>
  );
};

export default CategoryList;
