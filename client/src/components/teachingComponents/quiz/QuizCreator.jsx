import { useState, useEffect } from "react"
import { Checkbox, Text, Button, Container, Heading, Stack, HStack, VStack, Input, Textarea, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { correctAnswerMessages, wrongAnswerMessages } from "./answerMessageData"

const QuizCreator = ({ requireQuizIntro, submitQuizRef, setContent, setPageType, setEditMode, onSave, content }) => {
  const [quizTitle, setQuizTitle] = useState("nil")
  const [quizSynopsis, setQuizSynopsis] = useState("nil")
  const InitialQuizData = {
    question: "",
    questionType: "text",
    // questionPic: "",
    answerSelectionType: "single",
    answers: ["", "", "", ""],
    correctAnswer: "",
    messageForCorrectAnswer: correctAnswerMessages[Math.floor(Math.random() * correctAnswerMessages.length)],
    messageForIncorrectAnswer: wrongAnswerMessages[Math.floor(Math.random() * wrongAnswerMessages.length)],
    explanation: "",
    point: "",
  }
  console.log(content)
  const [currentQuestion, setCurrentQuestion] = useState(content? content.questions[0] : InitialQuizData)

  const handleQuestionChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      question: e.target.value,
    })

  }

  const handleAnswerChange = (e, index, isChecked) => {
    const answers = [...currentQuestion.answers]
    answers[index] = e.target.value

    setCurrentQuestion({
      ...currentQuestion,
      answers,
    })
  }

  const handleCorrectAnswerChange = (e, index) => {
    setCurrentQuestion({
      ...currentQuestion,
      correctAnswer: e.target.checked ? index.toString() : currentQuestion.correctAnswer,
    })
  }

  const handleExplanationChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      explanation: e.target.value,
    })
  }

  const handlePointChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      point: e.target.value,
    })
  }
  const handleQuizSubmission =  (currentQuestion, callback) => {
    console.log(currentQuestion)
    const quizData = {
      quizTitle,
      quizSynopsis,
      nrOfQuestions: "1",
      questions: [currentQuestion]
    }


    if (callback) {
      callback(quizData, 'quiz');
    }
}
  useEffect(() => {
    console.log('useEffect')
    submitQuizRef.current = (callback) => handleQuizSubmission(currentQuestion, callback);
    setEditMode(true)
  }, [currentQuestion])

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

          <Heading size="md">Question</Heading>
        </Stack>
      )}

      <Stack spacing="1" mt="1">
        <VStack align="left">
          <Text>Question</Text>
          <Input marginLeft="40px" type="text" placeholder="Enter Question" value={currentQuestion.question} onChange={handleQuestionChange} isRequired />
        </VStack>

        {currentQuestion.answers.map((answer, index) => (
          <VStack key={index} align="left">
            <Text>Answer {index + 1}</Text>
            <HStack spacing="4">
              <Checkbox isChecked={index.toString() === currentQuestion.correctAnswer} onChange={(e) => handleCorrectAnswerChange(e, index)} />
              <Input type="text" placeholder={`Enter Answer ${index + 1}`} value={currentQuestion.answers[index]} onChange={(e) => handleAnswerChange(e, index)} isRequired />
            </HStack>
          </VStack>
        ))}

        <VStack align="left">
          <Text>Explanation</Text>
          <Textarea placeholder="Enter Explanation" value={currentQuestion.explanation} onChange={(e) => handleExplanationChange(e)} isRequired />
        </VStack>

        <VStack align="left">
          <Text>Point</Text>
          <Input type="number" placeholder="Enter Point" value={currentQuestion.point} onChange={(e) => handlePointChange(e)} isRequired />
        </VStack>
      </Stack>

    </Container>
  )
}

export default QuizCreator
