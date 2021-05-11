import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Multiselect } from "multiselect-react-dropdown";
import { ItemContext } from "../context/Items/ItemContext";
import { useState } from "react";

const PublicItem = () => {
  let [url, setUrl] = useState("");
  let fetchPublicItem = () => {};
  return (
    <Form onSubmit={(e) => fetchPublicItem(e)}>
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
    </Form>
  );
};

export default PublicItem;
