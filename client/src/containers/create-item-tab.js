import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useState, useContext, useEffect } from "react";
import { ItemContext } from "../context/Items/ItemContext";
import { useAuth0 } from "@auth0/auth0-react";
import AddCategories from "../components/add-categories";
import CreateItem from "../components/create-item";

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

    let category_ids = categoryArray.map(({ _id }) => _id);

    postItem({
      url: url,
      user_id: sub,
      categories: category_ids,
    });
  };
  return (
    <Form onSubmit={(e) => post(e)}>
      {console.log("selected", categoryArray)}
      <CreateItem setUrl={setUrl} />
      <AddCategories categories={categories} setCategories={setCategories} />
      <Button>Submit</Button>
    </Form>
  );
};

export default CreateItemTab;
