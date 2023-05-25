/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useLocation } from "react-router-dom"
import { getUnits } from "../../../actions/unitActions"
import { VStack, Link, Box } from "@chakra-ui/react"

const ChapterSideBar = ({ handleChapterNumberChange, handleUnitChange, getUniqueChapterTutorials }) => {
  const { unit: unitName, subject, field } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const queryParams = new URLSearchParams(location.search)
  const chapter = parseInt(queryParams.get("chapter"))

  const units = useSelector((state) => state.units)
  const tutorials = useSelector((state) => state.tutorials)

  useEffect(() => {
    dispatch(getUnits(subject, field))
  }, [tutorials, units.length])


  return (
    <VStack spacing={4} p={3} minW="17vw" maxW="17vw" maxH="100%" overflow="auto" boxShadow="lg" borderRightWidth="5px">
      {units &&
        Object.values(units).map((unit) => {
          const isActiveUnit = unit.name.toLowerCase() === unitName.toLowerCase()
          return (
            <VStack key={unit._id} spacing={2}>
              <Link fontSize={isActiveUnit ? "lg" : "md"} fontWeight={isActiveUnit ? "bold" : "normal"} color={isActiveUnit ? "white" : "gray.500"} backgroundColor={isActiveUnit ? "blue.800" : "blue.50"} p={3} pl={isActiveUnit ? 4 : 2} borderRadius="md" borderLeftWidth={isActiveUnit ? "3px" : "none"} borderColor={isActiveUnit ? "blue.500" : "none"} onClick={() => handleUnitChange(unit.name)} _hover={{ backgroundColor: "blue.400", textDecoration: "underline" }}>
                {unit.name.replace(/-/g, " ")}
              </Link>

              {Array.isArray(tutorials) && unit?.tutorials?.length > 0 &&
                getUniqueChapterTutorials(unit.tutorials).map((tutorial) => {
                  const { _id, chapterNumber: tutorialChapterNumber, chapterName } = tutorial

                  const isActiveChapter = chapter === tutorialChapterNumber && unitName.toLowerCase() === unit.name.toLowerCase()

                  return (
                    <Link 
                    key={_id} 
                    fontSize="sm" 
                    fontWeight={isActiveChapter ? "semibold" : "normal"} 
                    color={isActiveChapter ? "white" : "gray.500"} 
                    backgroundColor={isActiveChapter ? "blue.500" : "green.50"} 
                    p={isActiveChapter ? 2 : 1} 
                    pl={isActiveChapter ? 3 : 1} 
                    borderRadius="md" 
                    borderLeftWidth={isActiveChapter ? "2px" : "none"} 
                    borderColor={isActiveChapter ? "green.400" : "none"}
                    onClick={() => handleChapterNumberChange(tutorialChapterNumber, unit.name)} 
                    _hover={{ backgroundColor: "green.400", textDecoration: "underline" }}
                  >
                    {chapterName}
                  </Link>
                  )
                })}
            </VStack>
          )
        })}
    </VStack>
  )
}

export default ChapterSideBar
