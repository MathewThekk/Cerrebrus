import { Button, Flex } from "@chakra-ui/react"
import TipTapEditor from "../textEditor/TipTapEditor"
import QuizCreator from "../quiz/QuizCreator"
import QuizReader from "../quiz/QuizReader"

const ChapterPageContent = ({ onSave, pageTypeFromUrl, setContent, setPageType, editable, tutorial, editMode, setEditMode, submitQuizRef, navigate, subject, field, unit, chapter, currentPage }) => {
  if (tutorial?.content) {
    switch (tutorial?.pageType) {
      case "Text":
        return (
          <Flex justify="center" align="center" height="70vh" className="textEditor">
            <TipTapEditor tutorial={tutorial} editable={editable} setContent={setContent} setPageType={setPageType} />
          </Flex>
        )
      case "quiz":
        if (!editMode) {
          console.log("Please")
          return (
            <Flex justify="center" align="center" height="70vh">
              <QuizReader tutorial={tutorial} content={tutorial.content} editable={editable} setContent={setContent} setPageType={setPageType} />
            </Flex>
          )
        }
        return (
          <Flex justify="center" align="center" height="70vh">
            <QuizCreator content={tutorial.content} onSave={onSave} setEditMode={setEditMode} submitQuizRef={submitQuizRef} editable={true} setContent={setContent} setPageType={setPageType} />
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
          <Flex justify="center" align="center" height="70vh">
            <TipTapEditor editable={true} setContent={setContent} setPageType={setPageType} />
          </Flex>
        )
      case "quiz":
        return (
          <Flex justify="center" align="center" height="70vh">
            <QuizCreator  onSave={onSave} setEditMode={setEditMode} submitQuizRef={submitQuizRef} editable={true} setContent={setContent} setPageType={setPageType} />
          </Flex>
        )
      case "interactive":
        return (
          <Flex>
            <h1>Interactive Component</h1>
          </Flex>
        )
      case "case study":
        return (
          <Flex>
            <h1>Case Study Component</h1>
          </Flex>
        )
      default:
        break
    }
  }

  //when no tutorial is found and no tutorial to be added
  return (
    <Flex justify="center" align="center" height="70vh">
      <Flex flexDirection="column" alignItems="center">
        <h1>
          No tutorial found for chapter {chapter}, Page {currentPage}.
        </h1>
        <Button
          m="4"
          onClick={() => {
            navigate(`/learn/${subject}/${field}/${unit}/addtutorial?chapter=${chapter}&page=${currentPage}`)
          }}
        >
          Add Tutorial
        </Button>
      </Flex>
    </Flex>
  )
}
export default ChapterPageContent
