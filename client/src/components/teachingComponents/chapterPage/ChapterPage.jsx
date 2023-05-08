/* eslint-disable react/jsx-no-comment-textnodes */
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTutorials } from "../../../actions/tutorialActions"
import { useParams, useLocation } from "react-router-dom"
import { useColorMode, Button, Heading, Flex, Box } from "@chakra-ui/react"
import ChapterHeaderButtons from "./ChapterPageHeaderButtons"
import ChapterPageContent from "./ChapterPageContent"

import { addTutorialPage } from "../../../actions/tutorialActions"
import { useNavigate } from "react-router-dom"
import ChapterPageFooterButtons from "./ChapterPageFooterButtons"

const ChapterStartPage = () => {
  const dispatch = useDispatch()
  const { subject, field, unit } = useParams()
  const queryParams = new URLSearchParams(useLocation().search)
  const chapter = parseInt(queryParams.get("chapter"))
  const page = parseInt(queryParams.get("page"))
  const pageTypeFromUrl = queryParams.get("pagetype")
  const [content, setContent] = useState("")
  const [pageType, setPageType] = useState(pageTypeFromUrl)
  const [currentPage, setCurrentPage] = useState(page)
  const [editable, setEditable] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode()

  const tutorials = useSelector((state) => state.tutorials.entities.tutorials)

  const tutorial = Object.values(tutorials).find((t) => t.chapter === chapter && t.page === currentPage)

  const submitQuizRef = useRef(null)

  useEffect(() => {
    console.log(1)
    dispatch(getTutorials(unit, field, subject))
  }, [dispatch, unit, field, subject, currentPage])

  const saveContent = () => {
    console.log(9)
    if (!tutorial && pageTypeFromUrl === "text") {
      console.log("Saving content...")
      dispatch(addTutorialPage(pageType, content, currentPage, chapter, unit, field, subject))
    }

    // if (!tutorial && pageTypeFromUrl === "quiz") {

    //   submitQuizRef.current(() => {
    //     console.log(content)
    //     dispatch(addTutorialPage(pageType, content, currentPage, chapter, unit, field, subject))
    //   })
    // } 
    else if (pageTypeFromUrl === "quiz") {
      console.log("Updating content...")
      submitQuizRef.current((content, pageType) => {
        dispatch(addTutorialPage(pageType, content, currentPage, chapter, unit, field, subject))
      })
    }

    // if (!tutorial && type === "quiz")
    // {
    //   console.log('yea')
    //       dispatch(addTutorialPage(pageType, content, currentPage, chapter, unit, field, subject))
    // }
  }

  const handlePrevPage = () => {
    const newPage = currentPage - 1
    setCurrentPage(newPage)
    navigate(`/learn/${subject}/${field}/${unit}?chapter=${chapter}&page=${newPage}`)
  }

  const handleNextPage = () => {
    const newPage = currentPage + 1
    setCurrentPage(newPage)
    navigate(`/learn/${subject}/${field}/${unit}?chapter=${chapter}&page=${newPage}`)
  }

  return (
    <div className="chapterPage">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading size="md" textAlign="center" flexGrow={1} mt="3">
          Chapter {chapter} - Page {currentPage}
        </Heading>
        <ChapterHeaderButtons tutorial={tutorial} pageTypeFromUrl={pageTypeFromUrl} editable={editable} setEditable={setEditable} editMode={editMode} setEditMode={setEditMode} saveContent={saveContent} toggleColorMode={toggleColorMode} colorMode={colorMode} navigate={navigate} subject={subject} field={field} unit={unit} chapter={chapter} currentPage={currentPage} />
      </Flex>
      <ChapterPageContent pageTypeFromUrl={pageTypeFromUrl} onSave= {saveContent} setContent={setContent} setPageType={setPageType} editable={editable} tutorial={tutorial} setEditMode={setEditMode} submitQuizRef={submitQuizRef} navigate={navigate} subject={subject} field={field} unit={unit} chapter={chapter} currentPage={currentPage} />
      <ChapterPageFooterButtons editMode={editMode} currentPage={currentPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </div>
  )
}

export default ChapterStartPage
