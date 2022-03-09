import { FormGroup, Label, Input } from "reactstrap";
const CreateItem = ({ setUrl, url }) => (
  <FormGroup>
    <Label for="title">Url</Label>
    <Input
      type="text"
      name="text"
      id="title"
      onChange={(e) => setUrl(e.target.value)}
      value={url}
      placeholder="enter a url and let quicklist do the rest"
    />
  </FormGroup>
);
export default CreateItem;
