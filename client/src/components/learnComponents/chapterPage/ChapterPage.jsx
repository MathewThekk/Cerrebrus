/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Flex, Box } from "@chakra-ui/react"
import ChapterHeaderButtons from "./ChapterPageHeaderButtons"
import ChapterPageContent from "./ChapterPageContent"
import ChapterPageFooterButtons from "./ChapterPageFooterButtons"
import ChapterSideBar from "./ChapterSideBar"
import { defaultChapterPageContent } from "./ChapterFirstPageDefaultContent"
import { getTutorials, addTutorialPage, updateTutorialPage, deleteTutorialPage, updateTutorialChapterName } from "../../../actions/tutorialActions"
import { deleteUnit, updateUnitName, addUnit } from "../../../actions/unitActions"

const ChapterPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const { subject, field, unit } = useParams()
  const queryParams = new URLSearchParams(location.search)
  const pageTypeFromUrl = queryParams.get("pagetype")
  const action = queryParams.get("action")

  const [content, setContent] = useState("")
  const [pageType, setPageType] = useState(pageTypeFromUrl)
  const [chapterNumber, setChapterNumber] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [editable, setEditable] = useState(false)
  const submitQuizRef = useRef(null)

  let tutorialPageData = null
  const units = useSelector((state) => state.units)
  const tutorials = useSelector((state) => state.tutorials)
  const tutorial = useSelector((state) => Object.values(state.tutorials).find((t) => t.chapterNumber === chapterNumber && t.page === currentPage)) ?? null

  useEffect(() => {
    setChapterNumber(parseInt(queryParams.get("chapter")))
    setCurrentPage(parseInt(queryParams.get("page")))
    action === "add" ? setEditable(true) : setEditable(false)

    dispatch(getTutorials(unit, field, subject))
  }, [units.length, location])

  const saveContent = () => {
    tutorialPageData = {
      pageType: pageType,
      content: content,
      currentPage: currentPage,
      chapterNumber: chapterNumber,
      chapterName: tutorials.find((t) => t.chapterNumber === chapterNumber).chapterName,
      unit: unit,
      field: field,
      subject: subject,
    }
    if (!tutorial && (pageTypeFromUrl === "text" || pageTypeFromUrl === "quiz")) {
      console.log("Saving content...")

      if (pageTypeFromUrl === "text") {
        dispatch(addTutorialPage(tutorialPageData))
      }
      if (pageTypeFromUrl === "quiz") {
        submitQuizRef.current((content, pageType) => {
          dispatch(addTutorialPage({ ...tutorialPageData, content: content, pageType: pageType }))
          setEditable(false)
        })
      }
      navigate(`/learn/${subject}/${field}/${unit}?chapter=${chapterNumber}&page=${currentPage}`)
    }
    if (tutorial) {
      console.log("Updating content...")
      if (tutorial.pageType === "text") {
        dispatch(updateTutorialPage(tutorialPageData))
      }

      if (tutorial.pageType === "quiz") {
        console.log("quiz update")

        submitQuizRef.current((content, pageType) => {
          dispatch(updateTutorialPage({ ...tutorialPageData, pageType: "text", content: content }))
          setEditable(false)
        })
      }
    }
  }

  const handleChapterNumberChange = (chapterNumber, unit) => {
    navigate(`/learn/${subject}/${field}/${unit.toLowerCase()}?chapter=${chapterNumber}&page=${1}`)
  }

  const handleUnitChange = (unitName) => {
    navigate(`/learn/${subject}/${field}/${unitName.toLowerCase()}?chapter=${1}&page=${1}`)
  }

  const handleAddPage = () => {
    navigate(`/learn/${subject}/${field}/${unit}/addtutorial?chapter=${chapterNumber}&page=${currentPage + 1}`)
  }

  const getUniqueChapterTutorials = () => {
    const tutorialMap = new Map()
    if (Array.isArray(tutorials)) {
      tutorials.forEach((tutorial) => {
        if (!tutorialMap.has(tutorial.chapterNumber)) {
          tutorialMap.set(tutorial.chapterNumber, tutorial)
        }
      })

      return Array.from(tutorialMap.values())
    }
  }

  const handleChapterNameChange = (newChapterName, chapterNumber, unitName) => {
    console.log(newChapterName, chapterNumber, unitName, field, subject)

    dispatch(updateTutorialChapterName(newChapterName, chapterNumber, unitName, field, subject))
  }

  const handleUnitNameChange = (newUnitName, unit) => {
    console.log(newUnitName, unit, field, subject)

    dispatch(updateUnitName(newUnitName, unit, field, subject))
  }

  const handleAddChapter = (newChapterNumber, newChapterName) => {
    if (!Array.isArray(tutorials) || tutorials.length === 0) {
      console.log("No tutorials")
    }

    if (getUniqueChapterTutorials().filter((t) => t.chapterNumber === newChapterNumber).length > 0) {
      console.log("chapter number already exist")
      return null
    }

    console.log("Adding New Chapter")
    tutorialPageData = {
      pageType: "text",
      content: defaultChapterPageContent,
      currentPage: 1,
      chapterNumber: newChapterNumber,
      chapterName: newChapterName,
      unit: unit,
      field: field,
      subject: subject,
    }

    dispatch(addTutorialPage(tutorialPageData))

    navigate(`/learn/${subject}/${field}/${unit}/?chapter=${newChapterNumber}&page=${1}`)
  }

  const isAnyChapterExistForUnit = () => {
    if (Array.isArray(tutorials)) {
      return tutorials.some((t) => t.chapterNumber > 0)
    } else {
      return false
    }
  }

  const allTutorialsFromAChapter = () => {
    if (tutorial) {
      return tutorials.filter((t) => t.chapterNumber === chapterNumber && t.page !== currentPage)
    }
  }

  const handleDeletePage = () => {
    console.log("Deleting content...")
    if (!tutorial) {
      navigate(`/learn/${subject}/${field}/${unit}/?chapter=${chapterNumber - 1}&page=${1}`)
    }

    if (tutorial) {
      if (allTutorialsFromAChapter().length === 0) {
        console.log("not tutorials left in chapter")

        navigate(`/learn/${subject}/${field}/${unit}/?chapter=${chapterNumber - 1}&page=${1}`)
      }
      if (allTutorialsFromAChapter().length !== 0) {
        console.log("tutorials left in chapter")

        const remainingPageNumbers = allTutorialsFromAChapter.map((t) => t.page)

        let closestPage = remainingPageNumbers.reduce((prev, curr) => {
          return Math.abs(curr - currentPage) < Math.abs(prev - currentPage) ? curr : prev
        })
        navigate(`/learn/${subject}/${field}/${unit}/?chapter=${chapterNumber}&page=${closestPage}`)
      }

      dispatch(deleteTutorialPage(tutorial))
    }
  }
  const handleAddUnit = async (newUnit) => {
    if (newUnit.trim() === "") return
    const UnitWithHyphens = newUnit.replace(/\s+/g, "-")
    dispatch(addUnit(UnitWithHyphens, field, subject))
    navigate(`/learn/${subject}/${field}/${UnitWithHyphens}?chapter=${1}&page=${1}`)
  }

  const handleDeleteUnit = (unitNameToDelete) => {
    if (unitNameToDelete.trim() === "") return
    const UnitNameWithHyphens = unitNameToDelete.replace(/\s+/g, "-")
    dispatch(deleteUnit(UnitNameWithHyphens, field, subject))
    navigate(`/learn/${subject}/${field}/${units[0].name}?chapter=${1}&page=${1}`)
  }

  const handlePrevPage = () => {
    const newPage = currentPage - 1
    navigate(`/learn/${subject}/${field}/${unit}?chapter=${chapterNumber}&page=${newPage}`)
  }

  const handleNextPage = () => {
    const newPage = currentPage + 1
    navigate(`/learn/${subject}/${field}/${unit}?chapter=${chapterNumber}&page=${newPage}`)
  }

  return (
    <Box maxW="100%" w="100%" maxH="90vh" mt="5">
      <ChapterHeaderButtons action={action} tutorial={tutorial} pageTypeFromUrl={pageTypeFromUrl} editable={editable} setEditable={setEditable} saveContent={saveContent} navigate={navigate} handleAddPage={handleAddPage} handleAddChapter={handleAddChapter} handleAddUnit={handleAddUnit} handleDeleteUnit={handleDeleteUnit} handleDeletePage={handleDeletePage} subject={subject} field={field} unit={unit} chapterNumber={chapterNumber} setChapterNumber={setChapterNumber} currentPage={currentPage} />
      <Flex maxH="90vh" minH="70vh" borderTop="1px solid" borderBottom="1px solid" borderColor="gray.300">
        <ChapterSideBar handleUnitNameChange={handleUnitNameChange} handleChapterNameChange={handleChapterNameChange} editable={editable} getUniqueChapterTutorials={getUniqueChapterTutorials} chapterNumber={chapterNumber} setCurrentPage={setCurrentPage} handleChapterNumberChange={handleChapterNumberChange} handleUnitChange={handleUnitChange} />
        <ChapterPageContent isAnyChapterExistForUnit={isAnyChapterExistForUnit} pageTypeFromUrl={pageTypeFromUrl} setContent={setContent} setPageType={setPageType} editable={editable} setEditable={setEditable} tutorial={tutorial} submitQuizRef={submitQuizRef} navigate={navigate} subject={subject} field={field} unit={unit} chapterNumber={chapterNumber} currentPage={currentPage} />
      </Flex>
      <ChapterPageFooterButtons editable={editable} currentPage={currentPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </Box>
  )
}

export default ChapterPage
