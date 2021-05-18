import { FormGroup, Label, Input } from "reactstrap";
const CreateItem = ({ setUrl }) => (
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
);
export default CreateItem;
