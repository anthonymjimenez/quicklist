import {
  IoPencilSharp,
  IoTrashSharp,
  IoAddSharp,
  IoShareSocialOutline,
} from "react-icons/io5";
import React from "react";

const CategoryIcons = ({ setEdit, setCategoryModal, setDeleteModal }) => {
  //
  return (
    <div>
      <button
        onClick={() => {
          setEdit((edit) => !edit);
        }}
      >
        <IoPencilSharp />
      </button>
      <button
        onClick={() => {
          setDeleteModal(true);
        }}
      >
        <IoTrashSharp />
      </button>
    </div>
  );
};

export default CategoryIcons;
