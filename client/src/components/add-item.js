import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
const AddItem = () => {
  let [categories, setCategories] = useState([]);
  let quicklist = [
    {
      title: "Sneakers",
      id: "12345",
    },
    {
      title: "Streetwear",
      id: "54321",
    },
  ];

  return (
    <Form>
      {console.log("selected", categories)}
      <FormGroup>
        <Label for="title">Url</Label>
        <Input
          type="text"
          name="text"
          id="title"
          placeholder="enter a url and let quicklist do the rest"
        />
      </FormGroup>
      <Label for="categories">Quick Lists</Label>
      <FormGroup>
        <Label for="exampleSelectMulti">Select Multiple</Label>
        <Multiselect
          onSelect={setCategories}
          options={quicklist}
          displayValue="title"
        />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};

export default AddItem;
