import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemContext } from "../context/Items/ItemContext";
import ItemList from "../containers/item-list";
import AddItem from "../components/add-item";
import { useAuth0 } from "@auth0/auth0-react";

const Item = () => {
  let { user } = useAuth0();
  let { id } = useParams();
  let { items, getItems, categories } = useContext(ItemContext);

  let [item, setItem] = useState([]);
  useEffect(() => {
    console.log(items.map((el) => el));
    let found = items.find(({ _id }) => _id === id);
    setItem(found);
    console.log(id);
  }, []);

  return <>{console.log("Item", items)}</>;
};

export default Item;
