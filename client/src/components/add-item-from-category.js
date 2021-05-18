import { Button, Form } from "reactstrap";
import { useState, useContext } from "react";
import { ItemContext } from "../context/Items/ItemContext";
import { useAuth0 } from "@auth0/auth0-react";
import CreateItem from "./create-item";

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
      <CreateItem setUrl={setUrl} />
      <Button>Submit</Button>
    </Form>
  );
};

export default AddItemFromCategory;
