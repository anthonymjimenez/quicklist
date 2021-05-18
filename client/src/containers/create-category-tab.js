import { Button, Form } from "reactstrap";
import { ItemContext } from "../context/Items/ItemContext";
import { useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CreateCategory from "../components/create-category";

const CreateCategoryTab = ({ clearErrors }) => {
  const {
    user: { sub },
  } = useAuth0();
  let { postNewCategory } = useContext(ItemContext);
  let [title, setTitle] = useState("");

  let post = (e) => {
    e.preventDefault();
    clearErrors();

    postNewCategory({ title: title, user_id: sub });
  };
  return (
    <Form onSubmit={(e) => post(e)}>
      <CreateCategory setTitle={setTitle} />
      <Button>Submit</Button>
    </Form>
  );
};

export default CreateCategoryTab;
