import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Input, HStack } from "@chakra-ui/react"

const AddChapterModal = ({ isModalOpen, setIsModalOpen, bodyPlaceHoderText, modalValue, setModalValue, bodyPlaceHoderText2, modalValue2, setModalValue2, headerText, footerText, handleModalAdd }) => {
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> {headerText} </ModalHeader>
        <ModalBody>
          <HStack>
            <Input maxLength={2} width="15%" type="number" placeholder={bodyPlaceHoderText} value={modalValue} onChange={(e) => setModalValue(parseInt(e.target.value))} />
            <Input maxLength={20} placeholder={bodyPlaceHoderText2} value={modalValue2} onChange={(e) => setModalValue2(e.target.value)} />
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              setIsModalOpen(false)
              handleModalAdd()
            }}
          >
            {footerText}
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddChapterModal
