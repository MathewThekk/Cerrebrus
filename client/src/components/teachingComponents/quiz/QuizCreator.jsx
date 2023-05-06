import { useState, useEffect, forwardRef } from "react"
import { Text, Button,  Container, Heading, Stack, HStack, VStack, Input, Textarea, Select, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { Link} from "react-router-dom"

const QuizCreator = forwardRef(({ requireQuizIntro, submitQuizRef, setContent, setPageType }, ref) => {
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

  const handleCorrectAnswerChange = (e, index) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index].correctAnswer = e.target.value
    setQuestions(updatedQuestions)
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
    const quizData = {
      quizTitle,
      quizSynopsis,
      questions,
    }
    setContent(quizData)
    setPageType("quiz")
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Container maxW="80vw" maxH="80vh">
      {requireQuizIntro && (
        <Stack spacing="6" direction="row">
          <InputGroup>
            <InputLeftElement children="Quiz Title" />
            <Input type="text" placeholder="Enter Quiz Title" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} isRequired />
          </InputGroup>

          <InputGroup>
            <InputLeftElement children="Quiz Synopsis" />
            <Textarea placeholder="Enter Quiz Synopsis" value={quizSynopsis} onChange={(e) => setQuizSynopsis(e.target.value)} isRequired />
          </InputGroup>

          <Heading size="md">Questions</Heading>
        </Stack>
      )}

      {questions.map((question, index) => (
        <Stack key={index} spacing="6" mt="3">
          <VStack align="left">
            <Text>Quesiton {index + 1}</Text>
            <Input marginLeft="40px" type="text" placeholder="Enter Question" value={question.question} onChange={handleQuestionChange} isRequired />
          </VStack>

          {question.answers.map((answer, index) => (
            <VStack key={index} align="left">
              <Text>Answer {index + 1}</Text>
              <Input type="text" placeholder={`Enter Answer ${index + 1}`} value={answer} onChange={(e) => handleAnswerChange(e, index)} isRequired />
            </VStack>
          ))}

          <VStack key={index} align="left">
            <Text>Correct Answer</Text>
            <Select placeholder="Select Correct Answer" value={question.correctAnswer} onChange={(e) => handleCorrectAnswerChange(e, index)} isRequired>
              {question.answers.map((answer, index) => (
                <option key={index} value={index.toString()}>
                  {answer}
                </option>
              ))}
            </Select>
          </VStack>

          <VStack  align="left">
          <Text>Message for Correct Answer</Text>
            <Input type="text" placeholder="Enter Message for Correct Answer" value={question.messageForCorrectAnswer} onChange={(e) => handleMessageForCorrectAnswerChange(e, index)} isRequired />
          </VStack>

          <VStack  align="left">
          <Text>Message for Incorrect Answer</Text>
            <Input type="text" placeholder="Enter Message for Incorrect Answer" value={question.messageForIncorrectAnswer} onChange={(e) => handleMessageForIncorrectAnswerChange(e, index)} isRequired />
          </VStack>

          <VStack  align="left">
          <Text>Explanation</Text>
            <Textarea placeholder="Enter Explanation" value={question.explanation} onChange={(e) => handleExplanationChange(e, index)} isRequired />
          </VStack>

          <VStack  align="left">
          <Text>Point</Text>
            <Input type="number" placeholder="Enter Point" value={question.point} onChange={(e) => handlePointChange(e, index)} isRequired />
          </VStack>
        </Stack>
      ))}

      <HStack mt="6">
        <Link to="/">Cancel</Link>
        <Button onClick={handleAddQuestion}>Add Question</Button>
      </HStack>
    </Container>
  )
})

export default QuizCreator
