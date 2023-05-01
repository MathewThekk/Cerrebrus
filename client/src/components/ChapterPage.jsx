import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTutorials } from "../actions/tutorialActions";
import { useParams, useLocation } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import TipTapEditor from "./textEditor/TipTapEditor";
import { addTutorialPage } from "../actions/tutorialActions";

const ChapterStartPage = () => {
  const dispatch = useDispatch();
  const { subject, field, unit } = useParams();
  const queryParams = new URLSearchParams(useLocation().search);
  const chapter = parseInt(queryParams.get("chapter"));
  const page = parseInt(queryParams.get("page"));
  const [content, setContent] = useState("");
  const [pageType, setPageType] = useState("");
  const [currentPage, setPage] = useState(page);
  const [editable, setEditable] = useState(false);
  // const tutorials = useSelector((state) => state.tutorials.entities.tutorials);

  const tutorial = useSelector((state) =>
    Object.values(state.tutorials.entities.tutorials).find(
      (t) => t.chapter === chapter && t.page === page
    )
  );

  useEffect(() => {
    dispatch(getTutorials(unit, field, subject));
  }, [dispatch, unit, field, subject]);
  

  const saveContent = () => {
    if (!tutorial) {
      console.log("Saving content...");
      dispatch(addTutorialPage(pageType, content, currentPage, chapter, unit, field, subject));
    } else {
      console.log("Updating content...");
      dispatch(addTutorialPage(pageType, content, currentPage, chapter, unit, field, subject));
    }
  };

  const handlePrevPage = () => {
    setPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setPage(currentPage + 1);
  };

  return (
    <div className="chapterPage">
      <div className="header" >
        <h2 className="header__title" >
          Chapter {chapter} - Page {currentPage}
        </h2>
        <div className="chapterPage-header__buttons" >
          <Button onClick={() => { setEditable(!editable); }} >
            {editable ? "Exit Edit" : "Edit"}
          </Button>
          <Button onClick={saveContent}>
            {!tutorial ? "Save" : "Update"}
          </Button>
        </div>
      </div>
      <div >
        {tutorial ? (
          <div className="textEditor">
            <TipTapEditor tutorial={tutorial} editable={editable} setContent={setContent} setPageType={setPageType} />
          </div>
        ) : (
          <p>No tutorial found for Chapter 1, Page 1.</p>
        )}
        <div className="chapterPage-pageNavigation">
          <Button disabled={currentPage === 1} onClick={handlePrevPage}>
            Previous Page
          </Button>
          <Button onClick={handleNextPage}>Next Page</Button>
        </div>
      </div>
    </div>
  );
};

export default ChapterStartPage
