import { FormGroup, Label } from "reactstrap";
import { Multiselect } from "multiselect-react-dropdown";

const AddCategories = ({ categories, setCategories }) => (
  <FormGroup>
    <Label for="categories">Quick Lists</Label>

    <Multiselect
      onSelect={(e) => setCategories(e.map(({ _id }) => _id))}
      onRemove={setCategories}
      placeholder={""}
      options={categories} // clean up categories, title is now required
      displayValue="title"
    />
  </FormGroup>
);

export default AddCategories;
