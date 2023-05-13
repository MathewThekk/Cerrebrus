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

const ChapterPage = () => {
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
    dispatch(getTutorials(unit, field, subject))
  }, [dispatch, unit, field, subject, currentPage])

  const saveContent = () => {
    if (!tutorial && pageTypeFromUrl === ("text" || "quiz")) {
      console.log("Saving content...")
      dispatch(addTutorialPage(pageType, content, currentPage, chapter, unit, field, subject))
    } else if (tutorial) {
      console.log("Updating content...")
      if (tutorial.pageType === "Text") {
        dispatch(addTutorialPage(pageType, content, currentPage, chapter, unit, field, subject))
      }

      if (tutorial.pageType === "quiz") {
        submitQuizRef.current((content, pageType) => {
          dispatch(addTutorialPage(pageType, content, currentPage, chapter, unit, field, subject))
          setEditMode(false)
        })
      }
    }
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
    <Flex justify="center">
      <Box maxW="70vw" maxH="70vh" w="100%">
        <Flex align="center" justify="center">
          <Heading size="md" textAlign="center" mt="3">
            {" "}
            Chapter {chapter} - Page {currentPage}{" "}
          </Heading>
          <Flex justify="flex-end" flex="1">
            {" "}
            <ChapterHeaderButtons tutorial={tutorial} pageTypeFromUrl={pageTypeFromUrl} editable={editable} setEditable={setEditable} editMode={editMode} setEditMode={setEditMode} saveContent={saveContent} toggleColorMode={toggleColorMode} colorMode={colorMode} navigate={navigate} subject={subject} field={field} unit={unit} chapter={chapter} currentPage={currentPage} />{" "}
          </Flex>
        </Flex>
        <ChapterPageContent pageTypeFromUrl={pageTypeFromUrl} onSave={saveContent} setContent={setContent} setPageType={setPageType} editable={editable} tutorial={tutorial} editMode={editMode} setEditMode={setEditMode} submitQuizRef={submitQuizRef} navigate={navigate} subject={subject} field={field} unit={unit} chapter={chapter} currentPage={currentPage} />
        <ChapterPageFooterButtons width="100%" editMode={editMode} currentPage={currentPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
      </Box>
    </Flex>
  )
}

export default ChapterPage
