import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTutorials } from "../../../actions/tutorialActions"
import { useParams, useLocation } from "react-router-dom"
import { Flex, Box } from "@chakra-ui/react"
import ChapterHeaderButtons from "./ChapterPageHeaderButtons"
import ChapterPageContent from "./ChapterPageContent"
import { addTutorialPage } from "../../../actions/tutorialActions"
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

  const tutorials = useSelector((state) => state.tutorials.entities.tutorials)
  const units = useSelector((state) => state.units?.entities?.units)

  if (tutorials) {
    tutorial = Object.values(tutorials).find((t) => t.chapterNumber === chapterNumber && t.page === currentPage)
    chapterName = tutorial ? tutorial.chapterName : chapterName
  }

  useEffect(() => {
    dispatch(getTutorials(unit, field, subject))
    dispatch(getUnits(subject, field))
    const queryParams = new URLSearchParams(location.search)
    const pageFromUrl = parseInt(queryParams.get("page"))
    setCurrentPage(pageFromUrl)
  }, [dispatch, location])

  const saveContent = () => {
    console.log(tutorial)
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
    }
    if (tutorial) {
      console.log("Updating content...")
      if (tutorial.pageType === "text") {
        dispatch(addTutorialPage(tutorialPageData))
      }

      if (tutorial.pageType === "quiz") {
        console.log("quiz update")

        submitQuizRef.current((content, pageType) => {
          console.log(100, content, pageType)
          dispatch(addTutorialPage({ ...tutorialPageData, content: content, pageType: pageType }))
          setEditable(false)
        })
      }
    }
  }

  const handleChapterNumberChange = (chapterNumber) => {
    navigate(`/learn/${subject}/${field}/${unit}?chapter=${chapterNumber}&page=${1}`)
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
      <ChapterHeaderButtons tutorial={tutorial} pageTypeFromUrl={pageTypeFromUrl} editable={editable} setEditable={setEditable} saveContent={saveContent} navigate={navigate} subject={subject} field={field} unit={unit} chapterNumber={chapterNumber} currentPage={currentPage} />
      <Flex>
        <ChapterSideBar units={units} chapterNumber={chapterNumber} setCurrentPage={setCurrentPage} handleChapterNumberChange={handleChapterNumberChange} />
        <ChapterPageContent pageTypeFromUrl={pageTypeFromUrl} setContent={setContent} setPageType={setPageType} editable={editable} tutorial={tutorial} submitQuizRef={submitQuizRef} navigate={navigate} subject={subject} field={field} unit={unit} chapterNumber={chapterNumber} currentPage={currentPage} />
      </Flex>
      <ChapterPageFooterButtons editable={editable} currentPage={currentPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </Box>
  )
}

export default ChapterPage
