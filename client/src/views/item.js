import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemContext } from "../context/Items/ItemContext";
import EditItemForm from "../forms/edit-item-form";
import ItemShow from "../components/item-show";
import ItemModal from "../modals/item-modal";
import ItemIcons from "../containers/item-icons";
import DeleteItemModal from "../modals/delete-item-modal";
import { Badge } from "reactstrap";
const Item = () => {
  let { id } = useParams();
  let { items, categories } = useContext(ItemContext);
  let [edit, setEdit] = useState(false);
  let [item, setItem] = useState([]);
  let [itemCategories, setItemCategories] = useState([]);
  let [itemCategoriesModal, setItemCategoriesModal] = useState(false);
  let [deleteItemModal, setDeleteItemModal] = useState(false);
  useEffect(() => {
    let found = items.find(({ _id }) => _id === id);
    if (items.length === 0) {
      setItem(false);
    }

    setItem(found);
    console.log(id, items);

    setItemCategories(
      categories.filter((cat) => item?.categories?.includes(cat._id))
    );
  }, [items, id, item]);

  return (
    <div>
      {!edit ? (
        <ItemShow item={item} />
      ) : (
        <EditItemForm item={item} setEdit={setEdit} />
      )}
      {itemCategoriesModal && (
        <ItemModal
          item={item}
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
      {itemCategories.map((category) => (
        <Badge>{category.title}</Badge>
      ))}
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
