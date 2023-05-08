import { Button } from "@chakra-ui/react"
import TipTapEditor from "../textEditor/TipTapEditor"
import QuizCreator from "../quiz/QuizCreator"
import QuizReader from "../quiz/QuizReader"

const ChapterPageContent = ({ onSave, pageTypeFromUrl, setContent, setPageType, editable, tutorial, setEditMode, submitQuizRef, navigate, subject, field, unit, chapter, currentPage }) => {
  if (tutorial) {
    switch (tutorial?.pageType) {
      case "Text":
        return (
          <div className="textEditor">
            <TipTapEditor tutorial={tutorial} editable={editable} setContent={setContent} setPageType={setPageType} />
          </div>
        )
        case "quiz":
          return (
            <div className="textEditor">
              <QuizReader tutorial={tutorial} content={tutorial.content} editable={editable} setContent={setContent} setPageType={setPageType} />
            </div>
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
          <div className="textEditor">
            <TipTapEditor editable={true} setContent={setContent} setPageType={setPageType} />
          </div>
        )
      case "quiz":
        return (
          <div>
            <QuizCreator onSave = {onSave} setEditMode={setEditMode} submitQuizRef={submitQuizRef} editable={true} setContent={setContent} setPageType={setPageType} />
          </div>
        )
      case "interactive":
        return (
          <div>
            <h1>Interactive Component</h1>
          </div>
        )
      case "case study":
        return (
          <div>
            <h1>Case Study Component</h1>
          </div>
        )
      default:
        return null
    }
  }

  //when no tutorial is found and no tutorial to be added
  return (
    <div className="chapterPage-No_Tutorial_Found">
      <div>
        <h1>
          No tutorial found for chapter {chapter}, Page {currentPage}.
        </h1>
        <Button
          onClick={() => {
            navigate(`/learn/${subject}/${field}/${unit}/addtutorial?chapter=${chapter}&page=${currentPage}`)
          }}
        >
          Add Tutorial
        </Button>
      </div>
    </div>
  )
}

export default ChapterPageContent
