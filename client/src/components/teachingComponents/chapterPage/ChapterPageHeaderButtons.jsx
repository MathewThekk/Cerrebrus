import { Button, Flex } from "@chakra-ui/react"
import AddChapterModal from "../../modals/AddChapterModal";
import { useState, useEffect } from "react";




const ChapterPageHeaderButtons = ({ action, tutorial, editable, setEditable, saveContent, navigate, subject, field, unit, chapterNumber,  currentPage, handleAddPage, handleDeletePage, handleAddChapter }) => {
 
  const [isModalOpen, setIsModalOpen] = useState(false);
 
 return (<Flex justify="center" mb="2" minW="100%">
    <Button mr="2" width="7rem" onClick={() => { handleAddPage() }} > {" "} + Page{" "} </Button>
    {/* Button to open the modal */}
    <Button mr="2" width="7rem" onClick={() => setIsModalOpen(true)}>
        + Chapter
      </Button>

      {/* Modal component */}
      {isModalOpen && (
        <AddChapterModal handleAddChapter={handleAddChapter} isModalOpen={isModalOpen} setIsModalOpen = {setIsModalOpen} />
      )}
  

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
