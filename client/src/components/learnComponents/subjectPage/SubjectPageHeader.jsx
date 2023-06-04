import { Button, Flex } from "@chakra-ui/react"
import { useState } from "react"
import { addSubject } from "../../../actions/subjectActions"
import { useDispatch } from "react-redux"
import AddSubjectModal from "./AddSubjectModal"

const ChapterPageHeaderButtons = (handleAddPage) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newSubjectName, setNewSubjectName] = useState("")
  const dispatch = useDispatch()

  const handleAddSubject = async () => {
    if (newSubjectName.trim() === "") return

    const subjectWithHyphens = newSubjectName.replace(/\s+/g, "-")

    dispatch(addSubject(subjectWithHyphens))
    setIsModalOpen(false)
  }

  return (
    <Flex justify="center" mb="2" minW="100%">
      <Button mr="2" width="9rem" onClick={() => setIsModalOpen(true)}>
        {" "}
        Add Subject{" "}
      </Button>
      <AddSubjectModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} bodyPlaceHoderText={"Add Subject"} modalValue={newSubjectName} setModalValue={setNewSubjectName} headerText={"Add Subject"} footerText={"Add"} handleModalAdd={handleAddSubject} />
      <Button mr="2" width="9rem" onClick={() => setIsModalOpen(true)}>
        {" "}
        Delete Subject{" "}
      </Button>
    </Flex>
  )
}

export default ChapterPageHeaderButtons
