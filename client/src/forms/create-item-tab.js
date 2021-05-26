import { Button, Form } from "reactstrap";
import { useState, useContext } from "react";
import { ItemContext } from "../context/Items/ItemContext";
import { useAuth0 } from "@auth0/auth0-react";
import AddCategories from "../form-components/add-categories";
import CreateItem from "../form-components/create-item";

const CreateItemTab = ({ category = null, clearErrors }) => {
  let [categoryArray, setCategories] = useState([]);
  let [url, setUrl] = useState("");
  const { categories, postItem } = useContext(ItemContext);
  let {
    user: { sub },
  } = useAuth0();

  let post = (e) => {
    e.preventDefault();
    clearErrors();

    postItem({
      url: url,
      user_id: sub,
      categories: categoryArray,
    });
  };
  return (
    <Form onSubmit={(e) => post(e)}>
      <CreateItem setUrl={setUrl} />
      <AddCategories categories={categories} setCategories={setCategories} />
      <Button>Submit</Button>
    </Form>
  );
};

export default CreateItemTab;
