import {
  IoReloadCircleSharp,
  IoPencilSharp,
  IoPaperPlaneSharp,
  IoTrashSharp,
  IoAddSharp,
} from "react-icons/io5";
const ItemIcons = ({ setEdit, setModal, item }) => {
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
  );
};

export default ItemIcons;
