import { useEffect, useState } from "react";import { useDispatch, useSelector } from "react-redux";import { getTutorials } from "../actions/tutorialActions";import { useParams, useLocation } from "react-router-dom";import { Button } from "@chakra-ui/react"; import TipTapEditor from "./textEditor/TipTapEditor";import { addTutorialPage } from "../actions/tutorialActions";import { useNavigate } from "react-router-dom";

const ChapterStartPage = () => {
  const dispatch = useDispatch();
  const { subject, field, unit } = useParams();
  const queryParams = new URLSearchParams(useLocation().search);
  const chapter = parseInt(queryParams.get("chapter"));
  const page = parseInt(queryParams.get("page"));
  const pageTypeFromUrl = queryParams.get("pagetype");
  const [content, setContent] = useState("");
  const [pageType, setPageType] = useState(pageTypeFromUrl);
  let [currentPage, setPage] = useState(page);
  const [editable, setEditable] = useState(false);
  const navigate = useNavigate();

  const tutorial = useSelector((state) => Object.values(state.tutorials.entities.tutorials).find((t) => t.chapter === chapter && t.page === page));

  useEffect(() => {
    dispatch(getTutorials(unit, field, subject));
  }, [dispatch, unit, field, subject, currentPage, chapter]);

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
    currentPage = currentPage - 1;
    setPage(currentPage);
    navigate(`/learn/${subject}/${field}/${unit}?chapter=${chapter}&page=${currentPage}`);
  };

  const handleNextPage = () => {
    currentPage = currentPage + 1;
    setPage(currentPage);
    navigate(`/learn/${subject}/${field}/${unit}?chapter=${chapter}&page=${currentPage}`);
  };

  return (
    <div className="chapterPage">
      <div className="header">
        <h2 className="header__title">
          {" "}
          Chapter {chapter} - Page {currentPage}{" "}
        </h2>
        <div className="chapterPage-header__buttons">
          {(tutorial || pageTypeFromUrl) && (
            <>
              <Button onClick={() => setEditable(!editable)}> {editable ? "Exit Edit" : "Edit"} </Button>
              <Button onClick={saveContent}>{!tutorial ? "Save" : "Update"}</Button>
            </>
          )}
        </div>
      </div>
      <div>
        {tutorial ? (
          <div className="textEditor">
            <TipTapEditor tutorial={tutorial} editable={editable} setContent={setContent} setPageType={setPageType} />
          </div>
        ): pageTypeFromUrl ? (
          (() => {
            switch (pageTypeFromUrl) {
              case "text":
                return (
                  <div className="textEditor">
                  <TipTapEditor  editable={true} setContent={setContent} setPageType={setPageType} />
                </div>
                );
              case "quiz":
                return <div><h1>Quiz Component</h1></div>;
              case "interactive":
                return <div><h1>Interactive Component</h1></div>;
              case "case study":
                return <div><h1>Case Study Component</h1></div>;
              default:
                return null;
            }
          })()
        ) : (
          
          <div className="chapterPage-No_Tutorial_Found">
          <div>
            <h1>No tutorial found for chapter {chapter}, Page {currentPage}.</h1>
            <Button onClick={()=>{
               navigate(`/learn/${subject}/${field}/${unit}/addtutorial?chapter=${chapter}&page=${currentPage}`);
          }}>Add Tutorial</Button>
          </div>
        </div>
        )}
        <div className="chapterPage-pageNavigation">
          <Button isDisabled={currentPage <= 1} onClick={handlePrevPage}>
            Previous Page
          </Button>
          <Button onClick={handleNextPage}>Next Page</Button>
        </div>
      </div>
    </div>
  )
};

export default ChapterStartPage;
