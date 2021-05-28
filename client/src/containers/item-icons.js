import {
  IoReloadCircleSharp,
  IoPencilSharp,
  IoPaperPlaneSharp,
  IoTrashSharp,
  IoAddSharp,
  IoShareSocialOutline,
} from "react-icons/io5";

const ItemIcons = ({ setEdit, setItemModal, setDeleteItemModal, item }) => {
  return (
    <div>
      <>
        <IoReloadCircleSharp />
      </>
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
