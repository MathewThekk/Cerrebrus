/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Flex, Box, Spinner } from "@chakra-ui/react"
import ChapterHeaderButtons from "./ChapterPageHeaderButtons"
import ChapterSideBar from "./ChapterSideBar"
import ChapterPageContent from "./ChapterPageContent"
import CommentsSection from "./CommentsSection"
import { getTutorials, addTutorialPage, updateChapter } from "../../../actions/tutorialActions"
import { SET_EDIT_MODE, SET_TUTORIAL } from "../../../reducers/learnReducers"

import ChapterAdditionalInformationSection from "./ChapterAdditionalInformationSection"


const ChapterPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()


  const { subject, field, unit } = useParams()
  const queryParams = new URLSearchParams(location.search)
  const pageTypeFromUrl = queryParams.get("pagetype")
  const action = queryParams.get("action")

  const [content, setContent] = useState("")
  const [pageType, setPageType] = useState(pageTypeFromUrl)
  const [chapterNumber, setChapterNumber] = useState(1)

  const submitQuizRef = useRef(null)

  let tutorialPageData = null
  const showSpinner = useSelector((state) => state.loading.spinner)

  const units = useSelector((state) => state.units)
  const tutorials = useSelector((state) => state.tutorials)

  const tutorial = useSelector((state) => Object.values(state.tutorials).find((t) => t.chapterNumber === chapterNumber)) ?? null
  const isAdmin = useSelector((state) => state.user?.user?.isAdmin)

 

  useEffect(() => {
    setChapterNumber(parseInt(queryParams.get("chapter")))

    action === "add" ? SET_EDIT_MODE(true) : SET_EDIT_MODE(false)

    if (unit !== "unitselect" && field && subject) dispatch(getTutorials(unit, field, subject))
  }, [units.length, location])

  useEffect(() => {
    if (tutorial) {
      dispatch(SET_TUTORIAL(tutorial))
    } else {
      dispatch(SET_TUTORIAL(null))
    }
  }, [tutorials])

  

  const saveContent = () => {
    console.log(content)
    tutorialPageData = {
      pageType: pageType === "quiz" ? "quiz" : "text",
      content: content,

      chapterNumber: chapterNumber,
      chapterName: tutorials.find((t) => t.chapterNumber === chapterNumber)?.chapterName ?? "Default",
      unit: unit,
      field: field,
      subject: subject,
    }
    if (!tutorial && (pageTypeFromUrl === "text" || pageTypeFromUrl === "quiz")) {
      console.log("Saving content...")

      if (pageTypeFromUrl === "text") {
        dispatch(addTutorialPage(tutorialPageData))
      }
      if (pageTypeFromUrl === "quiz") {
        submitQuizRef.current((content, pageType) => {
          dispatch(addTutorialPage({ ...tutorialPageData, content: content, pageType: pageType }))
          SET_EDIT_MODE(false)
        })
      }
      navigate(`/learn/${subject}/${field}/${unit}?chapter=${chapterNumber}`)
    }
    if (tutorial) {
      console.log("Updating content...")

      dispatch(updateChapter(tutorial._id, content))
    }
  }

  return (
    <Box overflowX="hidden">
      <Box maxW="100vw" mt="5">
        {isAdmin && <ChapterHeaderButtons action={action} saveContent={saveContent} chapterNumber={chapterNumber} />}
        <Flex w="100%" minH="75vh" borderTop="6px solid" borderBottom="6px solid" borderColor="black">
          <ChapterSideBar chapterNumber={chapterNumber} />
          {showSpinner ? <Spinner/> : <ChapterPageContent setContent={setContent} setPageType={setPageType} submitQuizRef={submitQuizRef} chapterNumber={chapterNumber} />}
        </Flex>
      </Box>
      <ChapterAdditionalInformationSection />
      <CommentsSection />
    </Box>
  )
}

export default ChapterPage
