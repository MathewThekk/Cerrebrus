import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"

import { Button, Flex } from "@chakra-ui/react"
import AddChapterModal from "../../modals/AddChapterModal"
import CustomModalDialogWithState from "../../modals/CustomModalDialogWithState"
import { deleteChapter, addTutorialPage } from "../../../actions/tutorialActions"
import { deleteUnit, addUnit } from "../../../actions/unitActions"


const ChapterPageHeaderButtons = ({ action, saveContent, chapterNumber, handleAddPage }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { subject, field, unit } = useParams()
  const [isAddChapterModalOpen, setIsAddChapterModalOpen] = useState(false)
  const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState(false)
  const [isDeleteUnitModalOpen, setIsDeleteUnitModalOpen] = useState(false)

  const units = useSelector((state) => state.units)
  // const tutorials = useSelector((state) => state.tutorials)
  const tutorial = useSelector(state => state.tutorialPage)
  const editMode = useSelector((state) => state.editMode)

  const handleDeleteChapter = () => {
    console.log("Deleting Chapter...")
    if (!tutorial) {
      navigate(`/learn/${subject}/${field}/${unit}/?chapter=${Math.max(chapterNumber - 1, 1)}`)
    } else {
      dispatch(deleteChapter(tutorial._id))
    }
  }

  const handleAddUnit = async (newUnit) => {
    if (newUnit.trim() === "") return
    const UnitWithHyphens = newUnit.replace(/\s+/g, "-")
    dispatch(addUnit(UnitWithHyphens, field, subject))
    navigate(`/learn/${subject}/${field}/${UnitWithHyphens}?chapter=${1}`)
  }

  const handleDeleteUnit = (unitNameToDelete) => {
    if (unitNameToDelete.trim() === "") return
    const UnitNameWithHyphens = unitNameToDelete.replace(/\s+/g, "-")
    dispatch(deleteUnit(UnitNameWithHyphens, field, subject))
    navigate(`/learn/${subject}/${field}/${units[0].name}?chapter=${1}`)
  }
  const handleAddChapter = (newChapterNumber, newChapterName) => {
    // if (tutorials.filter((t) => t.chapterNumber === newChapterNumber).length > 0) {
    //   console.log("chapter number already exist")
    //   return null
    // }
    console.log("Adding New Chapter")
   const  tutorialPageData = {
      pageType: "text",
      content: "Add tutorial content",
      chapterNumber: newChapterNumber,
      chapterName: newChapterName,
      unit: unit,
      field: field,
      subject: subject,
    }
    dispatch(addTutorialPage(tutorialPageData))
    navigate(`/learn/${subject}/${field}/${unit}/?chapter=${newChapterNumber}`)
  }
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
      {isAddUnitModalOpen && <CustomModalDialogWithState isModalOpen={isAddUnitModalOpen} setIsModalOpen={setIsAddUnitModalOpen} bodyPlaceHoderText1={"Add Unit"} headerText={"Add Unit"} footerText={"Add"} handleModalAdd={handleAddUnit} />}
      {isDeleteUnitModalOpen && <CustomModalDialogWithState isModalOpen={isDeleteUnitModalOpen} setIsModalOpen={setIsDeleteUnitModalOpen} bodyPlaceHoderText1={"Unit Name"} headerText={"Enter Unit Name to Delete"} footerText={"Delete"} handleModalAdd={handleDeleteUnit} />}

      {editMode && (
        <Button mr="2" width="7rem" onClick={saveContent}>
          {" "}
          {!tutorial ? "Save" : "Update"}{" "}
        </Button>
      )}
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
            handleDeleteChapter()
          }}
        >
          {" "}
          - Chapter{" "}
        </Button>
      ) : (
        <Button
          mr="2"
          width="7rem"
          onClick={() => {
            navigate(`/learn/${subject}/${field}/${unit}?chapter=${chapterNumber}`)
          }}
        >
          {" "}
          Exit{" "}
        </Button>
      )}
      <Button
        mr="2"
        width="7rem"
        onClick={() => {
          navigate(`/learn/${subject}/${field}/listtutorials`)
        }}
      >
        {" "}
        List Tutorials{" "}
      </Button>
    </Flex>
  )
}

export default ChapterPageHeaderButtons
