import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useState, useContext, useEffect } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { ItemContext } from "../context/Items/ItemContext";
import { useAuth0 } from "@auth0/auth0-react";

const AddItem = ({ category = null, clearErrors }) => {
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

    console.log({
      url: url,
      categories: category_ids,
    });
  };
  return (
    <Form onSubmit={(e) => post(e)}>
      {console.log("selected", categoryArray)}
      <FormGroup>
        <Label for="title">Url</Label>
        <Input
          type="text"
          name="text"
          id="title"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="enter a url and let quicklist do the rest"
        />
      </FormGroup>
      <FormGroup>
        <Label for="categories">Quick Lists</Label>

        <Multiselect
          onSelect={setCategories}
          onRemove={setCategories}
          placeholder={""}
          options={categories} // clean up categories, title is now required
          displayValue="title"
        />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};

export default AddItem;
