import { Form, Button } from "reactstrap";
import { useState, useContext } from "react";
import { ItemContext } from "../context/Items/ItemContext";
import AddCategories from "../form-components/add-categories";

const AddItemCategoriesTab = ({ item }) => {
  let [categoryArray, setCategories] = useState();
  const { categories, addItemCategories } = useContext(ItemContext);

  let post = (e) => {
    e.preventDefault();
    addItemCategories({
      id: item._id,
      categories: categoryArray,
    });
  };
  return (
    <Form onSubmit={(e) => post(e)}>
      <AddCategories
        categories={categories.filter(
          (cat) => !item.categories.includes(cat._id)
        )}
        setCategories={setCategories}
      />
      <Button>Submit</Button>
    </Form>
  );
};

export default AddItemCategoriesTab;
