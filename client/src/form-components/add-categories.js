import { FormGroup, Label } from "reactstrap";
import { Multiselect } from "multiselect-react-dropdown";

const AddCategories = ({ categories, setCategories }) => (
  <FormGroup>
    <Label for="categories">Quick Lists</Label>

    <Multiselect
      onSelect={(e) => setCategories(e.target.value._id)}
      onRemove={setCategories}
      placeholder={""}
      options={categories} // clean up categories, title is now required
      displayValue="title"
    />
  </FormGroup>
);

export default AddCategories;
