import { Button, Form } from "reactstrap";
import { useState, useContext } from "react";
import { ItemContext } from "../context/Items/ItemContext";
import AddCategories from "../form-components/add-categories";

const RemoveItemCategoriesTab = ({ item, clearErrors }) => {
  let [categoryArray, setCategories] = useState();
  const { categories /* removeItemCategories */ } = useContext(ItemContext);

  let post = (e) => {
    e.preventDefault();
    console.log(categoryArray);
    // removeItemCategories({
    //   item_id: item_.id ,
    //   categories: category_ids,
    // });
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
