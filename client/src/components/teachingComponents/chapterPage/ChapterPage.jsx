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
import { defaultChapterPageContent } from "./ChapterFirstPageDefaultContent"

const ChapterPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { subject, field, unit } = useParams()
  const queryParams = new URLSearchParams(location.search)

  const pageTypeFromUrl = queryParams.get("pagetype")
  let action = queryParams.get("action")

  const [content, setContent] = useState("")
  const [pageType, setPageType] = useState(pageTypeFromUrl)

  const [chapterNumber, setChapterNumber] = useState(parseInt(queryParams.get("chapter")) ?? 1)

  const [currentPage, setCurrentPage] = useState(parseInt(queryParams.get("page")) ?? 1)

  const [editable, setEditable] = useState(false)

  const navigate = useNavigate()
  const submitQuizRef = useRef(null)

  let tutorialPageData = null

  const tutorials = useSelector((state) => state.tutorials)
  const tutorial = useSelector((state) => Object.values(state.tutorials).find((t) => t.chapterNumber === chapterNumber && t.page === currentPage)) ?? null

  console.log(tutorial)

  // if (action !== "add" && tutorials) {

  //   tutorial = Object.values(tutorials).find((t) => t.chapterNumber === chapterNumber && t.page === currentPage)
  //   console.log(tutorial)
  // }

  useEffect(() => {
    dispatch(getUnits(subject, field))
  }, [tutorials])

  useEffect(() => {
    dispatch(getTutorials(unit, field, subject))
  }, [chapterNumber, currentPage])

  const saveContent = () => {
    console.log(content)

    tutorialPageData = {
      pageType: pageType,
      content: content,
      currentPage: currentPage,
      chapterNumber: chapterNumber,
      chapterName: tutorial ? tutorial.chapterName : "",
      unit: unit,
      field: field,
      subject: subject,
    }
    if (!tutorial && (pageTypeFromUrl === "text" || pageTypeFromUrl === "quiz")) {
      console.log("Saving content...")
      console.log(tutorialPageData)
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
          console.log(100, content, pageType)
          dispatch(updateTutorialPage({ ...tutorialPageData, pageType: "text", content: content }))
          setEditable(false)
        })
      }
    }
  }

  const handleChapterNumberChange = (chapterNumber, unit) => {
    navigate(`/learn/${subject}/${field}/${unit.toLowerCase()}?chapter=${chapterNumber}&page=${1}`)
    setChapterNumber(chapterNumber)
  }
  const handleAddPage = () => {
    navigate(`/learn/${subject}/${field}/${unit}/addtutorial?chapter=${chapterNumber}&page=${currentPage + 1}`)
  }

  const handleAddChapter = (newChapterNumber, newChapterName) => {
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

  const handleDeletePage = () => {
    console.log("Deleting content...")
    if (!tutorial) {
      setChapterNumber(chapterNumber - 1)
      navigate(`/learn/${subject}/${field}/${unit}/?chapter=${chapterNumber - 1}&page=${1}`)
    }

    if (tutorial) {
      dispatch(deleteTutorialPage(tutorial))
      setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
    }
    console.log(tutorial)
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
    <Box maxW="100%" w="100%" maxH="70vh" mt="5">
      <ChapterHeaderButtons action={action} tutorial={tutorial} pageTypeFromUrl={pageTypeFromUrl} editable={editable} setEditable={setEditable} saveContent={saveContent} navigate={navigate} handleAddPage={handleAddPage} handleAddChapter={handleAddChapter} handleDeletePage={handleDeletePage} subject={subject} field={field} unit={unit} chapterNumber={chapterNumber} setChapterNumber={setChapterNumber} currentPage={currentPage} />
      <Flex maxH="70vh">
        <ChapterSideBar chapterNumber={chapterNumber} setCurrentPage={setCurrentPage} handleChapterNumberChange={handleChapterNumberChange} />
        <ChapterPageContent pageTypeFromUrl={pageTypeFromUrl} setContent={setContent} setPageType={setPageType} editable={editable} tutorial={tutorial} submitQuizRef={submitQuizRef} navigate={navigate} subject={subject} field={field} unit={unit} chapterNumber={chapterNumber} currentPage={currentPage} />
      </Flex>
      <ChapterPageFooterButtons editable={editable} currentPage={currentPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </Box>
  )
}

export default ChapterPage
