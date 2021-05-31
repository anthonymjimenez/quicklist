import {
  IoReloadCircleSharp,
  IoPencilSharp,
  IoPaperPlaneSharp,
  IoTrashSharp,
  IoAddSharp,
  IoShareSocialOutline,
} from "react-icons/io5";
import React, { useContext } from "react";
import { ItemContext } from "../context/Items/ItemContext";

const ItemIcons = ({ setEdit, setItemModal, setDeleteItemModal, item }) => {
  let { autoUpdateItem } = useContext(ItemContext);
  //
  return (
    <div>
      <button
        onClick={() => {
          // autoUpdate(true)
          autoUpdateItem(item._id);
        }}
      >
        <IoReloadCircleSharp />
      </button>
      <button
        onClick={() => {
          setEdit((edit) => !edit);
        }}
      >
        <IoPencilSharp />
      </button>
      <button
        onClick={() => {
          setItemModal(true);
        }}
      >
        <IoAddSharp />
      </button>
      <a href={item?.url} rel="noreferrer" target="_blank">
        <IoPaperPlaneSharp />
      </a>
      <button
        onClick={() => {
          setDeleteItemModal(true);
        }}
      >
        <IoTrashSharp />
      </button>
      <button>
        <IoShareSocialOutline />
      </button>
    </div>
  );
};

export default ItemIcons;
