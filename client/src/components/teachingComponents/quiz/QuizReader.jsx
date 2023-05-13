

import React, { useState, useEffect } from "react";
// import Quiz from "react-quiz-component";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useLocation } from "react-router-dom"
import QuizRender from "./QuizRender";



const QuizReader = ({ content }) => {


  return (
    <div>
      {quizData ? (
        <QuizRender quizData={content} />
      ) : (
        <p>Loading quiz...</p>
      )}
    </div>
  );
};

export default QuizReader;





const quizData = {
  "nrOfQuestions": "1",
  "questions": [
      {
          "question": "kuhj",
          "questionType": "text",
          "answerSelectionType": "single",
          "answers": [
              "jhbm",
              "uiui",
              "jkhb",
              "vcvc"
          ],
          "correctAnswer": "1",
          "messageForCorrectAnswer": "Perfect!",
          "messageForIncorrectAnswer": "Better luck next time.",
          "explanation": "yuyi",
          "point": "4",
         
      }
  ]
}