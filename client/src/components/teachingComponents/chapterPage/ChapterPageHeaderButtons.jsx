import { Button, Flex } from "@chakra-ui/react"
import AddChapterModal from "../../modals/AddChapterModal";
import { useState, useEffect } from "react";



const ChapterPageHeaderButtons = ({ action, tutorial, pageTypeFromUrl, editable, setEditable, saveContent, navigate, subject, field, unit, chapterNumber, setChapterNumber, chapterName, setChapterName, currentPage, handleAddPage, handleDeletePage, handleAddChapter }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newChapterName, setNewChapterName] = useState('')

  const handleAddChapterModal = () => {
    handleAddChapter(newChapterName)
  }
 
 return (<Flex justify="center" mb="2" minW="100%">
    <Button mr="2" width="7rem" onClick={() => { handleAddPage() }} > {" "} + Page{" "} </Button>
    <Button mr="2" width="7rem" onClick={() => { setIsModalOpen(true) }} > {" "} + Chapter{" "} </Button>
    <AddChapterModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        bodyPlaceHoderText={chapterNumber}
        modalValue={chapterNumber}
        setModalValue={setChapterNumber}
        bodyPlaceHoderText2 = {newChapterName} 
        modalValue2 = {newChapterName} 
        setModalValue2 = {setNewChapterName}
        headerText={"Enter Chapter Number and Name"}
        footerText={"Add"}
        handleModalAdd={handleAddChapterModal}
      />

        {tutorial && (
          <Button mr="2" width="7rem" onClick={() => { setEditable(!editable) }} > {" "} {editable ? "Exit Edit" : "Edit"}{" "} </Button> )}
        
          <Button mr="2" width="7rem" onClick={saveContent}> {" "} {!tutorial ? "Save" : "Update"}{" "} </Button>
        


    {action !== "add" ? (
      <Button mr="2" width="7rem" onClick={() => { setEditable(!editable); handleDeletePage() }} > {" "} Delete{" "} </Button>
    ) : (
      <Button mr="2" width="7rem" onClick={() => { navigate(`/learn/${subject}/${field}/${unit}?chapter=${chapterNumber}&page=${currentPage}`) }} > {" "} Exit{" "} </Button>
    )}
  </Flex>)
}

export default ChapterPageHeaderButtons
