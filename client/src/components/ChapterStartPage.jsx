import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTutorials } from "../actions/tutorialActions";
import { Route, useParams, useLocation } from 'react-router-dom';
import TipTapReader from "./textEditor/TipTapReader";


const ChapterStartPage = () => {

  const tutorials = useSelector((state) => state.tutorials.entities.tutorials);
  const firstTutorial = Object.values(tutorials).find((tutorial) => tutorial.chapter === 1 && tutorial.page === 1);
  console.log(tutorials)


  
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(useLocation().search);
  const chapter = queryParams.get('chapter');
  const page = queryParams.get('page');
  const { subject, field, unit } = useParams()
  const [currentPage, setPage] = useState(null);

  useEffect(() => {
   dispatch(getTutorials(unit, field, subject));
  }, []);




    // Render the page content
    return  (   <div>
    <h1>Chapter 1, Page 1</h1>
    {firstTutorial ? (
      <div>
        <TipTapReader content = {firstTutorial.content}/>
      </div>
    ) : (
      <p>No tutorial found for Chapter 1, Page 1.</p>
    )}
  </div>
)
    }

export default ChapterStartPage;

