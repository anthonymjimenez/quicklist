import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemContext } from "../context/Items/ItemContext";
import ItemList from "../containers/item-list";
import AddItemFromCategory from "../forms/add-item-from-category";
import ErrorMessage from "../components/error-message";
import CategoryIcons from "../containers/category-icons";
import EditCategoryForm from "../forms/edit-category-form";
import DeleteCategoryModal from "../modals/delete-category-modal";

const Category = () => {
  let { id } = useParams();
  let { categories, itemError, clearErrors, addItemsToCategory } =
    useContext(ItemContext);
  let [category, setCategory] = useState([]);
  let [message, setMessage] = useState("");
  let [edit, setEdit] = useState(false);
  let [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  useEffect(() => {
    let found = categories.find((cat) => {
      return cat._id === id;
    });
    setCategory(found);
  }, [categories, id]);

  useEffect(() => {
    itemError.id === "POST_ITEM_ERROR"
      ? setMessage(itemError.message)
      : setMessage(false);

    console.log(itemError);
  }, [itemError]);

  return (
    <>
      <AddItemFromCategory category={category} clearErrors={clearErrors} />
      <ErrorMessage message={message} />
      <h1>
        {" "}
        Category:{" "}
        {edit ? (
          <EditCategoryForm category={category} setEdit={setEdit} />
        ) : (
          <> {category?.title} </>
        )}{" "}
      </h1>
      {}
      <CategoryIcons
        setEdit={setEdit}
        setDeleteModal={setDeleteCategoryModal}
      />

      <ItemList items={category?.items} />
      {deleteCategoryModal && (
        <DeleteCategoryModal
          setModal={setDeleteCategoryModal}
          modal={deleteCategoryModal}
          categoryId={category._id}
        />
      )}
    </>
  );
};

export default Category;
