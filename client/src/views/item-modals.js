import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ItemModal = ({ setModal, modal, item }) => {
  const toggle = () => setModal(false);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Tabs will be here soon</ModalHeader>
        <ModalBody>
          One tab will be the ability to add to categories
          <br /> The other will be to create a sharable link!
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
