import React from 'react'
import Quiz from 'react-quiz-component';
import {quizData} from './quizData'

const QuizReader = ({content, tutorial}) => {

    console.log(content)
    console.log(tutorial)

  return (
  <div>
   {content && <Quiz quiz={content} showDefaultResult={false}/>}
   </div>
  )
}

export default QuizReader