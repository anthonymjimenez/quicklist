import { Button, Form } from "reactstrap";
import { useState, useContext } from "react";
import { ItemContext } from "../context/Items/ItemContext";
import AddCategories from "../form-components/add-categories";

const RemoveCategoryItems = ({ category }) => {
  let [itemsArray, setItems] = useState([]);
  const { items, removeCategoryItems } = useContext(ItemContext);

  let post = (e) => {
    e.preventDefault();
    removeCategoryItems({
      id: category._id,
      items: itemsArray,
    });
  };
  return (
    <Form onSubmit={(e) => post(e)}>
      <AddCategories
        categories={items.filter((item) => category.items.includes(item._id))}
        setItems={setItems}
      />
      <Button>Submit</Button>
    </Form>
  );
};
export default RemoveCategoryItems;
