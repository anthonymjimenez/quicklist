import React, { useState, useContext } from "react";
import { ItemContext } from "../context/Items/ItemContext";
import { Form, Media, Input, Button } from "reactstrap";

const EditItemForm = ({ item, setEdit }) => {
  let [description, setDescription] = useState(item?.description);
  let [title, setTitle] = useState(item?.title);
  let [price, setPrice] = useState(item?.price);
  const { updateItem, categories } = useContext(ItemContext);
  return (
    <Form
      onSubmit={(e) => {
        console.log("why");
        e.preventDefault();
        updateItem(item._id, {
          description: description,
          title: title,
          price: price,
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
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </h2>
      <br />
      <div style={{ width: "90%" }}>
        <Media
          style={{ width: "85%" }}
          object
          src={item?.image}
          alt="Quicklist Icon"
        />
      </div>
      <img src={item?.logo} alt="Item logo" /> {item?.hostname}
      <Input
        type="textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button>Submit</Button>
    </Form>
  );
};

export default EditItemForm;
