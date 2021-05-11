import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemContext } from "../context/Items/ItemContext";

import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router";
const Item = () => {
  let { user } = useAuth0();
  let { id } = useParams();
  let { items, getItems, categories } = useContext(ItemContext);

  let [item, setItem] = useState(true);
  useEffect(() => {
    console.log(items.map((el) => el));
    let found = items.find(({ _id }) => _id === id);
    if (items.length === 0) {
      setItem(false);
    }

    setItem(found);
    console.log(id);
  }, []);

  return <>{item === false && <Redirect to="/items" />}</>;
};

export default Item;
