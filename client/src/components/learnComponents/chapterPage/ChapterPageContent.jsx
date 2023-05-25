import { Button, Flex } from "@chakra-ui/react"
import TipTapEditor from "../textEditor/TipTapEditor"
import QuizCreator from "../quiz/QuizCreator"
import QuizRender from "../quiz/QuizRender"

const ChapterPageContent = ({  pageTypeFromUrl, setContent, setPageType, editable, tutorial, submitQuizRef, navigate, subject, field, unit, chapterNumber, currentPage }) => {
  if (tutorial?.content) {
    switch (tutorial?.pageType) {
      case "text":
        return (
          <Flex justify="center" className="textRender">
            <TipTapEditor tutorial={tutorial} editable={editable} setContent={setContent} setPageType={setPageType} />
          </Flex>
        )
      case "quiz":
        if (!editable) {
          return (
            <Flex justify="center" align="center" className="ChapterPageContent">
              <QuizRender quizData={tutorial.content} />
            </Flex>
          )
        }
        return (
          <Flex justify="center" align="center" className="ChapterPageContent">
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
          <Flex justify="center" align="center" className="ChapterPageContent">
            <TipTapEditor editable={true} setContent={setContent} setPageType={setPageType} />
          </Flex>
        )
      case "quiz":
        return (
          <Flex justify="center" align="center" className="ChapterPageContent">
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
