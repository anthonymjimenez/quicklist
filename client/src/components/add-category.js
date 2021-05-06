import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { ItemContext } from "../context/Items/ItemContext";
import { useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AddCategory = () => {
  const {
    user: { sub },
  } = useAuth0();
  let { postNewCategory, itemError, clearErrors } = useContext(ItemContext);
  const [message, setMessage] = useState(false);
  let [title, setTitle] = useState("");

  useEffect(() => {
    itemError.id === "POST_CATEGORY_ERROR"
      ? setMessage(itemError.message)
      : setMessage(false);
    console.log(message);
  }, [itemError]);

  let post = (e) => {
    e.preventDefault();
    postNewCategory({ title: title, user_id: sub });
  };
  return (
    <Form onSubmit={(e) => post(e)}>
      {console.log(message)}
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          type="text"
          name="text"
          id="title"
          placeholder="Create new quicklist"
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormGroup>
      <Button>Submit</Button>
      {message && <> {message} </>}
    </Form>
  );
};

export default AddCategory;
