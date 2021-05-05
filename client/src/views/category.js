import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import ItemList from "../containers/item-list";
const Category = () => {
  let { state: category } = useLocation();
  console.log(category);
  return (
    <Fragment>
      Category: {category.title}
      <ItemList items={category.items} />
    </Fragment>
  );
};

export default Category;
