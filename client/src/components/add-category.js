import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
const AddCategory = () => {
  return (
    <Form>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          type="text"
          name="text"
          id="title"
          placeholder="Create new quicklist"
        />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};

export default AddCategory;
