import {
  IoReloadCircleSharp,
  IoPencilSharp,
  IoTrashSharp,
  IoAddSharp,
  IoShareSocialOutline,
} from "react-icons/io5";
import { Button, Tooltip } from "reactstrap";
import React, { useContext, useState } from "react";
import { ItemContext } from "../context/Items/ItemContext";

const ItemIcons = ({ setEdit, setItemModal, setDeleteItemModal, item }) => {
  let { autoUpdateItem } = useContext(ItemContext);
  let [autoUpdateToggle, setAutoUpdateToggle] = useState(false);
  let [editToggle, setEditToggle] = useState(false);
  let [addItemToggle, setAddItemToggle] = useState(false);
  let [deleteItemToggle, setDeleteItemToggle] = useState(false);
  //

  const toggle = (setToggle) => {
    setToggle((toggle) => !toggle);
  };
  return (
    <div className="mt-2">
      <span href="#" id="TooltipAutoUpdate">
        <Tooltip
          placement="right"
          isOpen={autoUpdateToggle}
          target="TooltipAutoUpdate"
          toggle={() => toggle(setAutoUpdateToggle)}
        >
          Auto update item
        </Tooltip>
        <Button
          className="mr-2"
          onClick={() => {
            // autoUpdate(true)
            autoUpdateItem(item._id);
          }}
        >
          <IoReloadCircleSharp />
        </Button>
      </span>
      <span href="#" id="TooltipEdit">
        <Tooltip
          placement="right"
          isOpen={editToggle}
          target="TooltipEdit"
          toggle={() => toggle(setEditToggle)}
        >
          Edit item
        </Tooltip>
        <Button
          className="mr-2"
          onClick={() => {
            setEdit((edit) => !edit);
          }}
        >
          <IoPencilSharp />
        </Button>
      </span>
      <span href="#" id="TooltipAddItems">
        <Tooltip
          placement="right"
          isOpen={addItemToggle}
          target="TooltipAddItems"
          toggle={() => toggle(setAddItemToggle)}
        >
          Add/Remove item from categories
        </Tooltip>
        <Button
          className="mr-2"
          onClick={() => {
            setItemModal(true);
          }}
        >
          <IoAddSharp />
        </Button>
      </span>
      <span href="#" id="TooltipDeleteItem">
        <Tooltip
          placement="right"
          isOpen={deleteItemToggle}
          target="TooltipDeleteItem"
          toggle={() => toggle(setDeleteItemToggle)}
        >
          Delete item
        </Tooltip>
        <Button
          className="mr-2"
          onClick={() => {
            setDeleteItemModal(true);
          }}
        >
          <IoTrashSharp />
        </Button>
      </span>
      {/* <Button>
        <IoShareSocialOutline />
      </Button> */}
    </div>
  );
};

export default ItemIcons;
