import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemContext } from "../context/Items/ItemContext";
import EditItemForm from "../containers/edit-item-form";
import ItemShow from "../components/item-show";
import ItemModal from "../modals/item-modal";
import ItemIcons from "../containers/item-icons";
import DeleteItemModal from "../modals/delete-item-modal";
const Item = () => {
  let { id } = useParams();
  let { items } = useContext(ItemContext);
  let [edit, setEdit] = useState(false);
  let [item, setItem] = useState(true);
  let [itemCategoriesModal, setItemCategoriesModal] = useState(false);
  let [deleteItemModal, setDeleteItemModal] = useState(false);
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
      {itemCategoriesModal && (
        <ItemModal
          setModal={setItemCategoriesModal}
          modal={itemCategoriesModal}
        />
      )}
      {deleteItemModal && (
        <DeleteItemModal
          setModal={setDeleteItemModal}
          modal={deleteItemModal}
          itemId={item._id}
        />
      )}
      <ItemIcons
        setEdit={setEdit}
        setDeleteItemModal={setDeleteItemModal}
        setItemModal={setItemCategoriesModal}
        item={item}
      />
    </div>
  );
};

export default Item;
