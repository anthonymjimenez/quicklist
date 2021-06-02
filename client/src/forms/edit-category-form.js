import React, { useState, useContext } from "react";
import { ItemContext } from "../context/Items/ItemContext";
import { Form, Input, Button } from "reactstrap";

const EditCategoryForm = ({ category, setEdit }) => {
  let [title, setTitle] = useState(category?.title);
  const { updateCategory, categories } = useContext(ItemContext);
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        updateCategory(category._id, {
          title: title,
        });
        setEdit(false);
      }}
    >
      <h2>
        {console.log("categories", categories)}
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></Input>
      </h2>
      <Button>Submit</Button>
    </Form>
  );
};

export default EditCategoryForm;
