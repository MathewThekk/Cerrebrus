import { Button, Flex } from "@chakra-ui/react"
// import TipTapEditor from "../textEditor/TipTapEditor"
import QuizCreator from "../quiz/QuizCreator"
import QuizRender from "../quiz/QuizRender"
import { useSelector } from "react-redux"
import { useParams,useLocation, useNavigate } from "react-router-dom"

import CKEditor5 from "../textEditor/CKEditor5"

const ChapterPageContent = ({  setContent, setPageType, editable, submitQuizRef, chapterNumber, currentPage }) => {
  const tutorial = useSelector((state) => state.tutorialPage)
  const navigate = useNavigate()
  const { subject, field, unit } = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const pageTypeFromUrl = queryParams.get("pagetype")


  if (tutorial?.content) {

    switch (tutorial?.pageType) {
      case "text":
        return (
          // <Flex className="ChapterPageContent">
          <Flex className="ChapterPageContent">
            {/* <TipTapEditor content={tutorial.content} editable={editable} setContent={setContent} setPageType={setPageType} limit = {25000} /> */}
            <CKEditor5 content={tutorial.content} editable={editable} setContent={setContent} setPageType={setPageType} limit={25000} />
          </Flex>
        )
      case "quiz":
        if (!editable) {
          return (
            <Flex className="ChapterPageContent">
              <QuizRender quizData={tutorial.content} />
            </Flex>
          )
        }
        return (
          <Flex className="ChapterPageContent">
            <QuizCreator content={tutorial.content} submitQuizRef={submitQuizRef} />
          </Flex>
        )

      default:
        return null
    }
  }

  //when no tutorial is found but tutorial to be added based on pageType from url
  if (pageTypeFromUrl) {
    switch (pageTypeFromUrl) {
      case "text":
        return (
          <Flex className="ChapterPageContent">
            <CKEditor5  editable={editable} setContent={setContent} setPageType={setPageType} limit={25000} />
          </Flex>
        )
      case "quiz":
        return (
          <Flex className="ChapterPageContent">
            <QuizCreator submitQuizRef={submitQuizRef} />
          </Flex>
        )
      case "interactive":
        return (
          <Flex className="ChapterPageContent">
            <h1>Interactive Component</h1>
          </Flex>
        )
      case "case study":
        return (
          <Flex className="ChapterPageContent">
            <h1>Case Study Component</h1>
          </Flex>
        )
      default:
        break
    }
  }

  //when no tutorial is found and no tutorial to be added
  return (
    <Flex justify="center" align="center" height="70vh" className="ChapterPageContent">
      <Flex flexDirection="column" alignItems="center">
        <h1>
          No tutorial found for chapter {chapterNumber}, Page {currentPage}.
        </h1>
        <Button
          m="4"
          onClick={() => {
            navigate(`/learn/${subject}/${field}/${unit}/addtutorial?chapter=${chapterNumber}&page=${currentPage}`)
          }}
        >
          Add Tutorial
        </Button>
      </Flex>
    </Flex>
  )
}
export default ChapterPageContent
