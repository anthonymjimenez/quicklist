import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemContext } from "../context/Items/ItemContext";
import EditItemForm from "../containers/edit-item-form";
import ItemShow from "../components/item-show";
import ItemModal from "./item-modals";
import ItemIcons from "../containers/item-icons";
const Item = () => {
  let { id } = useParams();
  let { items } = useContext(ItemContext);
  let [edit, setEdit] = useState(false);
  let [item, setItem] = useState(true);
  let [modal, setModal] = useState(false);
  useEffect(() => {
    console.log(items.map((el) => el));
    let found = items.find(({ _id }) => _id === id);
    if (items.length === 0) {
      setItem(false);
    }

    setItem(found);
    console.log(id, items);
  }, [items, id]);

  return (
    <div>
      {!edit ? (
        <ItemShow item={item} />
      ) : (
        <EditItemForm item={item} setEdit={setEdit} />
      )}
      {modal && <ItemModal setModal={setModal} modal={modal} />}

      <ItemIcons setEdit={setEdit} setModal={setModal} item={item} />
    </div>
  );
};

export default Item;
