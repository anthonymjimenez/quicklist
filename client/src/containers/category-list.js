import { ItemContext } from "../context/Items/ItemContext";
import CategoryPreview from "./category-preview";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const { categories } = useContext(ItemContext);

  return (
    <>
      {categories?.map((category) => (
        <Link
          key={category._id}
          style={{ textDecoration: "none" }}
          to={{
            pathname: `/category/${category._id}`,
          }}
        >
          <CategoryPreview category={category} key={category._id} />
        </Link>
      ))}
    </>
  );
};

export default CategoryList;
