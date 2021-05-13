import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useState, useContext, useEffect } from "react";
import { ItemContext } from "../context/Items/ItemContext";
import { useAuth0 } from "@auth0/auth0-react";

const AddItemFromCategory = ({ category = null, clearErrors }) => {
  let [url, setUrl] = useState("");
  const { postItem } = useContext(ItemContext);
  let {
    user: { sub },
  } = useAuth0();

  let post = (e) => {
    e.preventDefault();
    clearErrors();
    postItem({
      url: url,
      user_id: sub,
      categories: [category._id],
    });
    console.log("cle");
  };
  return (
    <Form onSubmit={(e) => post(e)}>
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

      <Button>Submit</Button>
    </Form>
  );
};

export default AddItemFromCategory;
