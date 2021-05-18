import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemContext } from "../context/Items/ItemContext";

const Item = () => {
  let { id } = useParams();
  let { items } = useContext(ItemContext);

  let [item, setItem] = useState(true);
  useEffect(() => {
    console.log(items.map((el) => el));
    let found = items.find(({ _id }) => _id === id);
    if (items.length === 0) {
      setItem(false);
    }

    setItem(found);
    console.log(id);
  }, [items, id]);

  return (
    <div>
      <h2>
        {console.log(item)}
        {item?.title} (${item?.price}){" "}
      </h2>
      <br />
      <img src={item?.logo} alt="Item logo" /> {item?.hostname}
      <p>{item?.description}</p>
      <a href={item?.url}>Product Url</a>
    </div>
  );
};

export default Item;
