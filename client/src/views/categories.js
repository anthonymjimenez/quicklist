import CategoryList from "../containers/category-list";
import { ItemContext } from "../context/Items/ItemContext";
import { useContext } from "react";

const Categories = () => {
  const { categories } = useContext(ItemContext);

  return (
    <div>
      {console.log(categories)}
      <CategoryList categories={categories} />
    </div>
  );
};

export default Categories;
