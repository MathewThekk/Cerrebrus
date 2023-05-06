import "./styles.css"
import { useState, useEffect, forwardRef } from "react"
import { Box, Button, Center, Container, Heading, HStack, Spacer, Stack, Input, Textarea, Select, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"

const QuizCreator = ({requireQuizIntro, submitQuizRef, setContent, setPageType}) => {
  const [quizTitle, setQuizTitle] = useState("")
  const [quizSynopsis, setQuizSynopsis] = useState("")
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    questionType: "text",
    questionPic: "",
    answerSelectionType: "single",
    answers: ["", "", "", ""],
    correctAnswer: "",
    messageForCorrectAnswer: "",
    messageForIncorrectAnswer: "",
    explanation: "",
    point: "",
  })

  

  const handleQuestionChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      question: e.target.value,
    })
  }

  const handleAnswerChange = (e, index) => {
    const answers = [...currentQuestion.answers]
    answers[index] = e.target.value

    setCurrentQuestion({
      ...currentQuestion,
      answers,
    })
  }

  const handleCorrectAnswerChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      correctAnswer: e.target.value,
    })
  }

  const handleAddQuestion = () => {
    setQuestions([...questions, currentQuestion])
    setCurrentQuestion({
      question: "",
      questionType: "text",
      questionPic: "",
      answerSelectionType: "single",
      answers: ["", "", "", ""],
      correctAnswer: "",
      messageForCorrectAnswer: "",
      messageForIncorrectAnswer: "",
      explanation: "",
      point: "",
    })
  }

  const handleQuizSubmission = () => {
    console.log("123")
    const quizData = {
      quizTitle,
      quizSynopsis,
      questions,
    }
    setContent(quizData)
    setPageType('quiz')
  }
  const handleMessageForCorrectAnswerChange = (e, index) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index].messageForCorrectAnswer = e.target.value
    setQuestions(updatedQuestions)
  }

  const handleMessageForIncorrectAnswerChange = (e, index) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index].messageForIncorrectAnswer = e.target.value
    setQuestions(updatedQuestions)
  }

  const handleExplanationChange = (e, index) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index].explanation = e.target.value
    setQuestions(updatedQuestions)
  }

  const handlePointChange = (e, index) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index].point = e.target.value
    setQuestions(updatedQuestions)
  }

  useEffect(() => {
    submitQuizRef.current = handleQuizSubmission
    setQuestions([...questions, currentQuestion])
  }, [])


  return (
    <div width="80vw" maxheight="80vh">
      {requireQuizIntro && (
        <div className="container">
          <div className="input-group">
            <label htmlFor="quizTitle">Quiz Title</label>
            <input type="text" id="quizTitle" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} required />
          </div>

          <div className="input-group">
            <label htmlFor="quizSynopsis">Quiz Synopsis</label>
            <textarea id="quizSynopsis" value={quizSynopsis} onChange={(e) => setQuizSynopsis(e.target.value)} required></textarea>
          </div>

          <h2>Questions</h2>
        </div>
      )}
      {questions.map((question, index) => (
        <div key={index} className="question-container">
          <div className="input-group">
            <label htmlFor={`question${index}`}>Question</label>
            <input type="text" id={`question${index}`} value={question.question} onChange={handleQuestionChange} required />
          </div>
          {question.answers.map((answer, idx) => (
            <div key={idx} className="input-group">
              <label htmlFor={`answer${index}${idx}`}>Answer {idx + 1}</label>
              <input type="text" id={`answer${index}${idx}`} value={answer} onChange={(e) => handleAnswerChange(e, idx)} required />
            </div>
          ))}

          <div className="input-group">
            <label htmlFor={`correctAnswer${index}`}>Correct Answer</label>
            <select id={`correctAnswer${index}`} value={question.correctAnswer} onChange={(e) => handleCorrectAnswerChange(e, index)} required>
              <option value="">Select correct answer</option>
              {question.answers.map((answer, idx) => (
                <option key={idx} value={idx.toString()}>
                  {answer}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor={`messageForCorrectAnswer${index}`}>Message for Correct Answer</label>
            <input type="text" id={`messageForCorrectAnswer${index}`} value={question.messageForCorrectAnswer} onChange={(e) => handleMessageForCorrectAnswerChange(e, index)} required />
          </div>

          <div className="input-group">
            <label htmlFor={`messageForIncorrectAnswer${index}`}>Message for Incorrect Answer</label>
            <input type="text" id={`messageForIncorrectAnswer${index}`} value={question.messageForIncorrectAnswer} onChange={(e) => handleMessageForIncorrectAnswerChange(e, index)} required />
          </div>

          <div className="input-group">
            <label htmlFor={`explanation${index}`}>Explanation</label>
            <textarea id={`explanation${index}`} value={question.explanation} onChange={(e) => handleExplanationChange(e, index)} required></textarea>
          </div>

          <div className="input-group">
            <label htmlFor={`point${index}`}>Point</label>
            <input type="number" id={`point${index}`} value={question.point} onChange={(e) => handlePointChange(e, index)} required />
          </div>

        </div>
      ))}

      <div className="actions">
        <Link to="/">Cancel</Link>
        <button onClick={handleAddQuestion}>Add Question</button>
      </div>
    </div>
  )
}

export default QuizCreator
