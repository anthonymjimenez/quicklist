import CategoryPreview from "./category-preview";
import React from "react";

const CategoryList = ({ categories }) => {
  return (
    <>
      {categories?.map((category) => (
        <CategoryPreview category={category} key={category._id} />
      ))}
    </>
  );
};

export default CategoryList;
