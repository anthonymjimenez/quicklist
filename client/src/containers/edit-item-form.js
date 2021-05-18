import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemContext } from "../context/Items/ItemContext";
import { Form, Media, Input, Button } from "reactstrap";

const EditItemForm = ({ item, setEdit }) => {
  let [description, setDescription] = useState(item?.description);
  let [title, setTitle] = useState(item?.title);
  let [price, setPrice] = useState(item?.price);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setEdit(false);
      }}
    >
      <h2>
        {console.log(item)}
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
