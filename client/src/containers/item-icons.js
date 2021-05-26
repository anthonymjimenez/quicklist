import {
  IoReloadCircleSharp,
  IoPencilSharp,
  IoPaperPlaneSharp,
  IoTrashSharp,
  IoAddSharp,
} from "react-icons/io5";
import { useHistory } from "react-router-dom";

const ItemIcons = ({ setEdit, setEtcModal, setDeleteModal, item }) => {
  let history = useHistory();

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
          setEtcModal(true);
        }}
      >
        <IoAddSharp />
      </button>
      <a href={item?.url} rel="noreferrer" target="_blank">
        <IoPaperPlaneSharp />
      </a>
      <button
        onClick={() => {
          setDeleteModal(true);
          history.goBack();
        }}
      >
        <IoTrashSharp />
      </button>
    </div>
  );
};

export default ItemIcons;
