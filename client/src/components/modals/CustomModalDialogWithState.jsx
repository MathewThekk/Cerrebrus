import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Input, HStack } from "@chakra-ui/react"
import { useState } from "react";

const CustomModalDialogWithState = ({isModalOpen, setIsModalOpen,bodyPlaceHoderText1, bodyPlaceHoderText2, headerText, footerText, handleModalAdd}) => {



  const [modalValue1, setModalValue1] = useState("")
  const [modalValue2, setModalValue2] = useState("")
  
 
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> {headerText} </ModalHeader>
        <ModalBody>
          <HStack>
            <Input placeholder={bodyPlaceHoderText1} value={modalValue1} onChange={(e) => setModalValue1(e.target.value)} />
           {bodyPlaceHoderText2 && <Input  placeholder={bodyPlaceHoderText2} value={modalValue2} onChange={(e) => setModalValue2(e.target.value)} />}
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
                setIsModalOpen(false)
                handleModalAdd(modalValue1, modalValue2)
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

export default CustomModalDialogWithState
