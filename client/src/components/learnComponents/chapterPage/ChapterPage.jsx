/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Flex, Box } from "@chakra-ui/react"
import ChapterHeaderButtons from "./ChapterPageHeaderButtons"
import ChapterSideBar from "./ChapterSideBar"
import ChapterPageContent from "./ChapterPageContent"
import ChapterPageFooterButtons from "./ChapterPageFooterButtons"
import CommentsSection from "./CommentsSection"

// import { defaultChapterPageContent } from "./ChapterFirstPageDefaultContent"
import { getTutorials, addTutorialPage, updateTutorialPage, deleteTutorialPage, updateTutorialChapterName } from "../../../actions/tutorialActions"
import { deleteUnit, updateUnitName, addUnit } from "../../../actions/unitActions"
import { SET_TUTORIAL } from "../../../reducers/learnReducers"
import ChapterAdditionalInformationSection from "./ChapterAdditionalInformationSection"

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
  const isAdmin = useSelector((state) => state.user?.user?.isAdmin)

  useEffect(() => {
    setChapterNumber(parseInt(queryParams.get("chapter")))
    setCurrentPage(parseInt(queryParams.get("page")))
    action === "add" ? setEditable(true) : setEditable(false)

    if (unit !== 'unitselect' && field && subject) dispatch(getTutorials(unit, field, subject))
  }, [units.length, location])

  useEffect(() => {
    if (tutorial) {
      dispatch(SET_TUTORIAL(tutorial))
    } else {
      dispatch(SET_TUTORIAL(null))
    }
  }, [tutorials])

  const saveContent = () => {
    console.log(content)
    tutorialPageData = {
      pageType: pageType === "quiz" ? "quiz" : "text",
      content: content,
      currentPage: currentPage,
      chapterNumber: chapterNumber,
      chapterName: tutorials.find((t) => t.chapterNumber === chapterNumber)?.chapterName ?? "Default",
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
          dispatch(updateTutorialPage({ ...tutorialPageData, pageType: "quiz", content: content }))
          setEditable(false)
        })
      }
    }
  }

  const saveAdditionalInformationContent = () => {}

  const handleChapterNumberChange = (chapterNumber, unit) => {
    navigate(`/learn/${subject}/${field}/${unit.toLowerCase()}?chapter=${chapterNumber}&page=${1}`)
  }

  const handleUnitChange = (unitName) => {
    navigate(`/learn/${subject}/${field}/${unitName.toLowerCase()}?chapter=${1}&page=${1}`)
  }

  const handleAddPage = () => {
    navigate(`/learn/${subject}/${field}/${unit}/addtutorial?chapter=${chapterNumber}&page=${currentPage + 1}`)
  }

  const getUniqueChapterTutorials = (tutorials) => {
    const tutorialMap = new Map()
    if (Array.isArray(tutorials)) {
      tutorials.forEach((tutorial) => {
        if (!tutorialMap.has(tutorial.chapterNumber)) {
          tutorialMap.set(tutorial.chapterNumber, tutorial)
        }
      })

      const sortedTutorials = Array.from(tutorialMap.values())

      sortedTutorials.sort((a, b) => a.chapterNumber - b.chapterNumber)

      return sortedTutorials
    }
  }

  const handleChapterNameChange = (newChapterName, chapterNumber, unitName) => {
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

    if (getUniqueChapterTutorials(tutorials).filter((t) => t.chapterNumber === newChapterNumber).length > 0) {
      console.log("chapter number already exist")
      return null
    }

    console.log("Adding New Chapter")
    tutorialPageData = {
      pageType: "text",
      content: "Add tutorial content",
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

  const allTutorialsFromAChapter = () => {
    if (tutorial) {
      return tutorials.filter((t) => t.chapterNumber === chapterNumber && t.page !== currentPage)
    }
  }

  const handleDeletePage = () => {
    console.log("Deleting content...")
    if (!tutorial) {
      navigate(`/learn/${subject}/${field}/${unit}/?chapter=${Math.max(chapterNumber - 1, 1)}&page=${1}`)
    }

    if (tutorial) {
      if (allTutorialsFromAChapter().length === 0) {
        console.log("no tutorials left in chapter")

        navigate(`/learn/${subject}/${field}/${unit}/?chapter=${Math.max(chapterNumber - 1, 1)}&page=${1}`)
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
    <Box overflowX="hidden">
      <Box maxW="100vw"  mt="5">
        {isAdmin && (
          <ChapterHeaderButtons action={action} tutorial={tutorial} pageTypeFromUrl={pageTypeFromUrl} editable={editable} setEditable={setEditable} saveContent={saveContent} navigate={navigate} handleAddPage={handleAddPage} handleAddChapter={handleAddChapter} handleAddUnit={handleAddUnit} handleDeleteUnit={handleDeleteUnit} handleDeletePage={handleDeletePage} subject={subject} field={field} unit={unit} chapterNumber={chapterNumber} setChapterNumber={setChapterNumber} currentPage={currentPage} />
        )}
        <Flex  w="100%" minH="75vh"  borderTop="6px solid" borderBottom="6px solid" borderColor="black">
          <ChapterSideBar handleUnitNameChange={handleUnitNameChange} handleChapterNameChange={handleChapterNameChange} editable={editable} getUniqueChapterTutorials={getUniqueChapterTutorials} chapterNumber={chapterNumber} setCurrentPage={setCurrentPage} handleChapterNumberChange={handleChapterNumberChange} handleUnitChange={handleUnitChange} />
          <ChapterPageContent setContent={setContent} setPageType={setPageType} editable={editable} setEditable={setEditable} submitQuizRef={submitQuizRef} chapterNumber={chapterNumber} currentPage={currentPage} />
        </Flex>
        <ChapterPageFooterButtons editable={editable} currentPage={currentPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
      </Box>
      <ChapterAdditionalInformationSection editable={editable} saveAdditionalInformationContent={saveAdditionalInformationContent} />
      <CommentsSection />
    </Box>
  )
}

export default ChapterPage
