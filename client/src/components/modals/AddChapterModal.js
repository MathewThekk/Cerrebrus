import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Input, HStack } from "@chakra-ui/react"
import { useState } from "react";

const AddChapterModal = ({handleAddChapter, isAddChapterModalOpen, setIsAddChapterModalOpen}) => {

  console.log(1)

  const maxChapterLimit = 10;


  const [newChapterNumber, setNewChapterNumber] = useState(1)
  const [newChapterName, setNewChapterName] = useState('')
  
 
  return (
    <Modal isOpen={isAddChapterModalOpen} onClose={() => setIsAddChapterModalOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Enter Chapter Number and Name </ModalHeader>
        <ModalBody>
          <HStack>
          <Input maxLength={2} width="15%" type="number" placeholder="01" value={newChapterNumber} onChange={(e) => {if (e.target.value < maxChapterLimit) setNewChapterNumber(e.target.value)}} />
            <Input maxLength={60} placeholder="Chapter Name" value={newChapterName} onChange={(e) => setNewChapterName(e.target.value)} />
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              setIsAddChapterModalOpen(false)
              handleAddChapter(newChapterNumber, newChapterName)
            }}
          >
            Add Chapter
          </Button>
          <Button onClick={() => setIsAddChapterModalOpen(false)}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddChapterModal
