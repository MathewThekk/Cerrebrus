import React, { useState } from "react"
import { Box, Button, Text } from "@chakra-ui/react"

const QuizRender = ({ quizData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isSelectedAnswerCorrect, setIsSelectedAnswerCorrect] = useState(null)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [nextQuestionExist, setNextQuestionExist] = useState(false)

  const handleAnswerOptionClick = (isCorrect) => {
    setIsSelectedAnswerCorrect(isCorrect)
    setShowExplanation(true)
    if (isCorrect) {
      setScore(score + 1)
    }
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < quizData.questions.length) {
      setNextQuestionExist(true)
    } else {
      setNextQuestionExist(false)
    }
  }

  const handleNextQuestion = () => {
    setIsSelectedAnswerCorrect(null)
    setShowExplanation(false)
    setCurrentQuestion(currentQuestion + 1)
  }

  return (
    <Box p={4} align="center">
      {showScore ? (
        <Text fontSize="xl" fontWeight="bold">
          You scored {score} out of {quizData.questions.length}
        </Text>
      ) : (
        <Box>
          <Box mb={4}>
            <Text fontSize="xl" fontWeight="bold">
              {quizData.questions[currentQuestion].question}
            </Text>
            <Box mt={4}>
              {quizData.questions[currentQuestion].answers.map((answer, index) => (
                <Button key={index} onClick={() => handleAnswerOptionClick(index === parseInt(quizData.questions[currentQuestion].correctAnswer))} mr={2} mb={2}>
                  {answer}
                </Button>
              ))}
            </Box>
          </Box>
          {showExplanation && (
            <Box mt={4}>
              <Text fontSize="lg" fontWeight="bold">
                {isSelectedAnswerCorrect ? quizData.questions[currentQuestion].messageForCorrectAnswer : quizData.questions[currentQuestion].messageForIncorrectAnswer}
              </Text>
              <Text mt={2}>{quizData.questions[currentQuestion].explanation}</Text>
              {nextQuestionExist ? (
                <Button onClick={handleNextQuestion} mt={4}>
                  Next Question
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setShowScore(true)
                  }}
                  mt={4}
                >
                  Finish Quiz
                </Button>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default QuizRender
