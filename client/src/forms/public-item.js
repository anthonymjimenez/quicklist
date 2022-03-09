import { Button, Form } from "reactstrap";
import { ItemContext } from "../context/Items/ItemContext";
import { useState, useContext } from "react";
import CreateItem from "../form-components/create-item";

const PublicItem = () => {
  let [url, setUrl] = useState("");
  const { publicItem, getPublicItem } = useContext(ItemContext);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        getPublicItem({ url: url });
      }}
    >
      <CreateItem setUrl={setUrl} url={url} />
      <Button
        className="mr-5"
        onClick={() =>
          setUrl(
            "https://www.nike.com/t/pegasus-trail-3-gore-tex-mens-running-shoes-HG005k/DR0137-200"
          )
        }
      >
        {" "}
        Use Example URL{" "}
      </Button>
      <Button>Submit</Button>
      {console.log("public", publicItem)}
    </Form>
  );
};

export default PublicItem;
