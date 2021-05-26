import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ItemCategoriesModalTabs from "../forms/item-categories-modal-tabs";

const ItemModal = ({ setModal, modal, item }) => {
  const toggle = () => setModal(false);

  return (
    <div>
      {console.log(item)}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Tabs will be here soon</ModalHeader>
        <ModalBody>
          <ItemCategoriesModalTabs item={item} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ItemModal;
