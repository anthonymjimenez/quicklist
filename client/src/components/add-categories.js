import { useState } from "react";
import { FormGroup, Label, Multiselect } from "reactstrap";

const AddCategories = ({ categories, setCategories }) => {
  <FormGroup>
    <Label for="categories">Quick Lists</Label>

    <Multiselect
      onSelect={setCategories}
      onRemove={setCategories}
      placeholder={""}
      options={categories} // clean up categories, title is now required
      displayValue="title"
    />
  </FormGroup>;
};

export default AddCategories;
