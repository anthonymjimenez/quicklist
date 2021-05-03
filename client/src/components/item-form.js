import { useState } from "react";

const ItemForm = () => {
  let [url, setUrl] = useState("");

  return (
    <form>
      <input field="text" />
      <button>Submit</button>
    </form>
  );
};

export default ItemForm;
