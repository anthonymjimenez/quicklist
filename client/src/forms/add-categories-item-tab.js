import { Form } from "reactstrap";
import { useState, useContext } from "react";
import { ItemContext } from "../context/Items/ItemContext";
import AddCategories from "../form-components/add-categories";

const AddCategoriesItemTab = ({ item, clearErrors }) => {
  let [categoryArray, setCategories] = useState();
  const { categories } = useContext(ItemContext);

  let post = (e) => {
    e.preventDefault();
    clearErrors();
    console.log(categoryArray);
    // addCategoriesToItem({
    //   item_id: item_.id ,
    //   categories: category_ids,
    // });
  };
  return (
    <Form onSubmit={(e) => post(e)}>
      <AddCategories
        categories={categories.filter((cat) => !item.categories.includes(cat))}
        setCategories={setCategories}
      />
    </Form>
  );
};

export default AddCategoriesItemTab;
