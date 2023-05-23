import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useLocation } from "react-router-dom"
import { getUnits } from "../../../actions/unitActions"
import { VStack, Link, Box } from "@chakra-ui/react"

const ChapterSideBar = ({ handleChapterNumberChange }) => {
  const { unit: unitName, subject, field } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const queryParams = new URLSearchParams(location.search)
  const chapter = parseInt(queryParams.get("chapter"))

  const units = useSelector((state) => state.units)
  const tutorials = useSelector((state) => state.tutorials)

  useEffect(() => {
    console.log("tutorials changed")
    dispatch(getUnits(subject, field))
  }, [tutorials])

  // Function to filter unique chapter numbers
  const getUniqueChapters = (tutorials) => {
    const tutorialMap = new Map()
    tutorials.forEach((tutorial) => {
      if (!tutorialMap.has(tutorial.chapterNumber)) {
        tutorialMap.set(tutorial.chapterNumber, tutorial)
      }
    })
    return Array.from(tutorialMap.values())
  }

  return (
    <VStack spacing={4} p={3} minW="17vw" maxW="17vw" maxH="100%" overflow="auto" boxShadow="lg" borderRightWidth="5px">
      {units &&
        Object.values(units).map((unit) => (
          <VStack key={unit._id} spacing={2}>
            <Box fontSize="lg" fontWeight="bold" pb={1}>
              {unit.name}
            </Box>

            {getUniqueChapters(unit.tutorials).map((tutorial) => {
              const { _id, chapterNumber: tutorialChapterNumber, chapterName } = tutorial

              const isActiveChapter = chapter === tutorialChapterNumber && unitName === unit.name.toLowerCase()

              return (
                <Link key={_id} fontSize="sm" fontWeight="bold" color={isActiveChapter ? "white" : "gray.600"} backgroundColor={isActiveChapter ? "blue.500" : "transparent"} p={isActiveChapter ? 2 : 1} borderRadius="md" onClick={() => handleChapterNumberChange(tutorialChapterNumber, unit.name)} _hover={{ color: "blue.500", textDecoration: "underline" }}>
                  {chapterName}
                </Link>
              )
            })}
          </VStack>
        ))}
    </VStack>
  )
}

export default ChapterSideBar
