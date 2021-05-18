import { FormGroup, Label, Input } from "reactstrap";
const CreateCategory = ({ setTitle }) => (
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
);

export default CreateCategory;
