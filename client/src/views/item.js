import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemContext } from "../context/Items/ItemContext";
import { Form, Media, Input, Button } from "reactstrap";
import {
  IoReloadCircleSharp,
  IoPencilSharp,
  IoPaperPlaneSharp,
  IoTrashSharp,
  IoAddSharp,
} from "react-icons/io5";
import EditItemForm from "../containers/edit-item-form";
import ItemShow from "../components/item-show";
import ItemModal from "./item-modals";
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
      <div>
        <>
          <IoReloadCircleSharp />
        </>
        <button onClick={() => (edit ? setEdit(false) : setEdit(true))}>
          <IoPencilSharp />
        </button>
        <button
          onClick={() => {
            setModal(true);
          }}
        >
          <IoAddSharp />
        </button>
        <a href={item?.url} rel="noreferrer" target="_blank">
          <IoPaperPlaneSharp />
        </a>
        <>
          <IoTrashSharp />
        </>
      </div>
    </div>
  );
};

export default Item;
