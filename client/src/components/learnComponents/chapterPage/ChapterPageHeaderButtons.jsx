import { Button, Flex } from "@chakra-ui/react"
import AddChapterModal from "../../modals/AddChapterModal";
import { useState } from "react";
import CustomModalDialogWithState from "../../modals/CustomModalDialogWithState"



const ChapterPageHeaderButtons = ({ action, tutorial, editable, setEditable, saveContent, navigate, subject, field, unit, chapterNumber,  currentPage, handleAddPage, handleDeletePage, handleAddChapter, handleDeleteUnit, handleAddUnit }) => {
 
  const [isAddChapterModalOpen, setIsAddChapterModalOpen] = useState(false);
  const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState(false);
  const [isDeleteUnitModalOpen, setIsDeleteUnitModalOpen] = useState(false);
  
 
 return (
   <Flex justify="center" mb="2" minW="100%" ml="10%">

     {/* Button to open the modal */}
     <Button mr="2" width="7rem" onClick={() => setIsAddChapterModalOpen(true)}>
       + Chapter
     </Button>
     <Button mr="2" width="7rem" onClick={() => setIsAddUnitModalOpen(true)}>
       + Unit
     </Button>
     <Button mr="2" width="7rem" onClick={() => setIsDeleteUnitModalOpen(true)}>
       - Unit
     </Button>

     {/* Modal component */}
     {isAddChapterModalOpen && <AddChapterModal handleAddChapter={handleAddChapter} isAddChapterModalOpen={isAddChapterModalOpen} setIsAddChapterModalOpen={setIsAddChapterModalOpen} />}
     {isAddUnitModalOpen && <CustomModalDialogWithState isModalOpen={isAddUnitModalOpen} setIsModalOpen={setIsAddUnitModalOpen} bodyPlaceHoderText1={"Add Unit"}  headerText={"Add Unit"} footerText={"Add"} handleModalAdd={handleAddUnit} />}
     {isDeleteUnitModalOpen && <CustomModalDialogWithState isModalOpen={isDeleteUnitModalOpen} setIsModalOpen={setIsDeleteUnitModalOpen} bodyPlaceHoderText1={"Unit Name"}  headerText={"Enter Unit Name to Delete"} footerText={"Delete"} handleModalAdd={handleDeleteUnit} />}

     {tutorial && (
       <Button
         mr="2"
         width="7rem"
         onClick={() => {
           setEditable(!editable)
         }}
       >
         {" "}
         {editable ? "Exit Edit" : "Edit"}{" "}
       </Button>
     )}

     {editable && <Button mr="2" width="7rem" onClick={saveContent}>
       {" "}
       {!tutorial ? "Save" : "Update"}{" "}
     </Button>}
     <Button
       mr="2"
       width="7rem"
       onClick={() => {
         handleAddPage()
       }}
     >
       {" "}
       + Page{" "}
     </Button>
     {action !== "add" ? (
       <Button
         mr="2"
         width="7rem"
         onClick={() => {
           setEditable(!editable)
           handleDeletePage()
         }}
       >
         {" "}
         - Page{" "}
       </Button>
     ) : (
       <Button
         mr="2"
         width="7rem"
         onClick={() => {
           navigate(`/learn/${subject}/${field}/${unit}?chapter=${chapterNumber}&page=${currentPage}`)
         }}
       >
         {" "}
         Exit{" "}
       </Button>
     )}
   </Flex>
 )
}

export default ChapterPageHeaderButtons
