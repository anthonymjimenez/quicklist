import React, { useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ItemContext } from "../context/Items/ItemContext";

const DeleteItemModal = ({ setModal, modal, item }) => {
  const toggle = () => setModal(false);
  let { deleteItem } = useContext(ItemContext);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this item?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => deleteItem(item.id)}>
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
