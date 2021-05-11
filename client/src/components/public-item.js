import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Multiselect } from "multiselect-react-dropdown";
import { ItemContext } from "../context/Items/ItemContext";
import { useState, useContext } from "react";

const PublicItem = () => {
  let [url, setUrl] = useState("");
  const { publicItem, getPublicItem } = useContext(ItemContext);

  let fetchPublicItem = () => {};
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        getPublicItem({ url: url });
      }}
    >
      <FormGroup>
        <Input
          type="text"
          name="text"
          id="title"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="enter a url and let quicklist do the rest"
        />
      </FormGroup>
      <Button>Submit</Button>
      {console.log("public", publicItem)}
    </Form>
  );
};

export default PublicItem;
