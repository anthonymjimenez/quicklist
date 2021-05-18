import CategoryPreview from "./category-preview";
import React from "react";
import { Link } from "react-router-dom";

const CategoryList = ({ categories }) => {
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
