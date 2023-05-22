import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Input,  } from "@chakra-ui/react";

const CustomModalDialog = ({ isModalOpen, setIsModalOpen,bodyPlaceHoderText, modalValue , setModalValue, headerText, footerText, handleModalAdd }) => {
  return (

    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> {headerText} </ModalHeader>
        <ModalBody>
          <Input placeholder={bodyPlaceHoderText} value={modalValue} onChange={(e) => setModalValue(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleModalAdd}>
            {footerText}
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

  );
};

export default CustomModalDialog;
