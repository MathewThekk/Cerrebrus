import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useLocation } from "react-router-dom"
import { Flex, Box } from "@chakra-ui/react"
import ChapterHeaderButtons from "./ChapterPageHeaderButtons"
import ChapterPageContent from "./ChapterPageContent"
import { getTutorials, addTutorialPage, updateTutorialPage, deleteTutorialPage } from "../../../actions/tutorialActions"
import { useNavigate } from "react-router-dom"
import ChapterPageFooterButtons from "./ChapterPageFooterButtons"
import ChapterSideBar from "./ChapterSideBar"
import { getUnits } from "../../../actions/unitActions"

const ChapterPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { subject, field, unit } = useParams()
  const queryParams = new URLSearchParams(useLocation().search)

  const pageTypeFromUrl = queryParams.get("pagetype")
  let action = queryParams.get("action")

  const [content, setContent] = useState("")
  const [pageType, setPageType] = useState(pageTypeFromUrl)
  const chapterNumber = parseInt(queryParams.get("chapter"))
  const [currentPage, setCurrentPage] = useState(1)
  const [editable, setEditable] = useState(false)

  const navigate = useNavigate()
  const submitQuizRef = useRef(null)

  let tutorialPageData = null
  let tutorial = null

  let chapterName = "First Chapter"

  const tutorials = useSelector((state) => state.tutorials)
  const units = useSelector((state) => state.units)

  if (action !== "add" && tutorials) {
    tutorial = Object.values(tutorials).find((t) => t.chapterNumber === chapterNumber && t.page === currentPage)
    chapterName = tutorial ? tutorial.chapterName : chapterName
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const pageFromUrl = parseInt(queryParams.get("page"))
    setCurrentPage(pageFromUrl)
  }, [location])

  useEffect(() => {
    dispatch(getTutorials(unit, field, subject))
    dispatch(getUnits(subject, field))
  }, [])

  const saveContent = () => {
    tutorialPageData = {
      pageType: pageType,
      content: content,
      currentPage: currentPage,
      chapterNumber: chapterNumber,
      chapterName: chapterName,
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
          console.log(100, tutorialPageData.chapterName)
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
          console.log(100, content, pageType)
          dispatch(updateTutorialPage({ ...tutorialPageData, content: content, pageType: pageType }))
          setEditable(false)
        })
      }
    }
  }

  const handleChapterNumberChange = (chapterNumber, unit) => {
    navigate(`/learn/${subject}/${field}/${unit.toLowerCase()}?chapter=${chapterNumber}&page=${1}`)
  }
  const handleAddPage = () => {
    navigate(`/learn/${subject}/${field}/${unit}/addtutorial?chapter=${chapterNumber}&page=${currentPage + 1}`)
  }

  const handleDeletePage = () => {
    if (tutorial) {
      console.log("Deleting content...")

      dispatch(deleteTutorialPage(tutorial))
    }
  }

  const handlePrevPage = () => {
    const newPage = currentPage - 1
    setCurrentPage(newPage)

    navigate(`/learn/${subject}/${field}/${unit}?chapter=${chapterNumber}&page=${newPage}`)
  }

  const handleNextPage = () => {

    const newPage = currentPage + 1
    setCurrentPage(newPage)
    navigate(`/learn/${subject}/${field}/${unit}?chapter=${chapterNumber}&page=${newPage}`)
  }

  return (
    <Box maxW="100%" w="100%" maxH="100%" mt="5">
      <ChapterHeaderButtons tutorial={tutorial} pageTypeFromUrl={pageTypeFromUrl} editable={editable} setEditable={setEditable} saveContent={saveContent} navigate={navigate} handleAddPage={handleAddPage} handleDeletePage={handleDeletePage} subject={subject} field={field} unit={unit} chapterNumber={chapterNumber} currentPage={currentPage} />
      <Flex>
        <ChapterSideBar units={units} unit={unit} chapterNumber={chapterNumber} setCurrentPage={setCurrentPage} handleChapterNumberChange={handleChapterNumberChange} />
        <ChapterPageContent pageTypeFromUrl={pageTypeFromUrl} setContent={setContent} setPageType={setPageType} editable={editable} tutorial={tutorial} submitQuizRef={submitQuizRef} navigate={navigate} subject={subject} field={field} unit={unit} chapterNumber={chapterNumber} currentPage={currentPage} />
      </Flex>
      <ChapterPageFooterButtons editable={editable} currentPage={currentPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </Box>
  )
}

export default ChapterPage
