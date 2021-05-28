import { Button, Form } from "reactstrap";
import { useState, useContext } from "react";
import { ItemContext } from "../context/Items/ItemContext";
import AddCategories from "../form-components/add-categories";

const RemoveItemCategoriesTab = ({ item }) => {
  let [categoryArray, setCategories] = useState();
  const { categories, modifyItemCategories } = useContext(ItemContext);

  let post = (e) => {
    e.preventDefault();
    console.log(categoryArray);
    modifyItemCategories(
      {
        item_id: item._id,
        categories: categoryArray,
      },
      "removeCategories"
    );
  };
  return (
    <Form onSubmit={(e) => post(e)}>
      <AddCategories
        categories={categories.filter((cat) =>
          item.categories.includes(cat._id)
        )}
        setCategories={setCategories}
      />
      <Button>Submit</Button>
    </Form>
  );
};

export default RemoveItemCategoriesTab;
