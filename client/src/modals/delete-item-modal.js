import React, { useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ItemContext } from "../context/Items/ItemContext";
import { useHistory } from "react-router-dom";

const DeleteItemModal = ({ setModal, modal, itemId }) => {
  const toggle = () => setModal(false);
  let { deleteItem } = useContext(ItemContext);
  let history = useHistory();

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this item?</ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              console.log(itemId, "item id");
              deleteItem(itemId);
              history.goBack();
            }}
          >
            Yes
          </Button>
          <Button color="secondary" onClick={toggle}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeleteItemModal;
