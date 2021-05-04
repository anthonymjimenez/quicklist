import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useState, useContext, useEffect } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { ItemContext } from "../context/Items/ItemContext";
import { useAuth0 } from "@auth0/auth0-react";

const AddItem = () => {
  let [categoryArray, setCategories] = useState([]);
  let [url, setUrl] = useState("");
  const { categories, getCategories, postItem } = useContext(ItemContext);
  let {
    user: { sub },
  } = useAuth0();

  useEffect(() => {
    getCategories(sub);
  }, []);

  let post = (e) => {
    e.preventDefault();
    let category_ids = categoryArray.map(({ _id }) => _id);
    postItem({
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
      <Label for="categories">Quick Lists</Label>
      <FormGroup>
        <Label for="exampleSelectMulti">Select Multiple</Label>
        <Multiselect
          onSelect={setCategories}
          onRemove={setCategories}
          options={categories}
          displayValue="title"
        />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};

export default AddItem;
