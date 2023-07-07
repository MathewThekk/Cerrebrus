/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { getUnits } from "../../../actions/unitActions"
import { VStack, Link, Box, Flex, Checkbox, Editable, EditablePreview, EditableInput } from "@chakra-ui/react"

const ChapterSideBar = ({ handleChapterNumberChange, handleChapterNameChange, handleUnitChange, handleUnitNameChange, getUniqueChapterTutorials }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const { unit: unitName, subject, field } = useParams()
  const queryParams = new URLSearchParams(location.search)
  const chapter = parseInt(queryParams.get("chapter"))

  const units = useSelector((state) => state.units)
  const editMode = useSelector((state) => state.editMode)


  const currenTutorials = useSelector((state) => state.tutorials)
  const [newChapterName, setNewChapterName] = useState("")
  const [newUnitName, setNewUnitName] = useState("")

  const populateTutorial = true

  useEffect(() => {
    if (subject && field && populateTutorial === true) dispatch(getUnits(subject, field, populateTutorial))
    if (unitName === "unitselect") {
      if (units.length > 0) {
        navigate(`/learn/${subject}/${field}/${units[0].name.toLowerCase()}?chapter=${1}&page=${1}`)
      }
    }
  }, [currenTutorials, units.length])

  return (
    <Box minW="19vw" maxW="17vw" minH="100%" maxH="100%" overflow="auto" boxShadow="lg" borderRight="5px solid" borderColor="black">
      <Box p="5" fontWeight="900" fontFamily="Arial, sans-serif" fontSize="xl">
        Technical Product Management
      </Box>
      {units &&
        Object.values(units).map((unit) => {
          return (
            <VStack key={unit._id} spacing="0">
              <Flex  w="100%">
                {editMode ? (
                  <Editable
                    defaultValue={unit.name}
                    onSubmit={(newUnitName) => {
                      handleUnitNameChange(newUnitName, unit.name)
                    }}
                  >
                    <EditablePreview h="100%" fontSize="sm" fontWeight="normal" color="gray.500" _hover={{ backgroundColor: "green.400", textDecoration: "underline" }} />
                    <EditableInput value={newUnitName} onChange={(e) => setNewUnitName(e.target.value)} autoFocus />
                  </Editable>
                ) : (
                  <Link fontSize="md" fontWeight="bold" p={3} onClick={() => handleUnitChange(unit.name)} _hover={{ backgroundColor: "blue.400", textDecoration: "underline" }}>
                    {unit.name.replace(/-/g, " ").toUpperCase()}
                  </Link>
                )}
              </Flex>

              {unit?.tutorialIds?.length > 0 &&
                getUniqueChapterTutorials(unit.tutorialIds).map((t) => {
                  const { _id, chapterNumber: tutorialChapterNumber, chapterName } = t

                  const isActiveChapter = chapter === tutorialChapterNumber && unitName.toLowerCase() === unit.name.toLowerCase()

                  return (
                    <Flex p="2" w="100%" key={_id} display="flex" textAlign="left" bg={isActiveChapter ? "Grey" : null} h="100%">
                      <Checkbox isChecked={isActiveChapter} size="md" colorScheme="green" mr={2} />
                      {editMode ? (
                        <Editable
                          defaultValue={chapterName}
                          onSubmit={(newChapterName) => {
                            handleChapterNameChange(newChapterName, tutorialChapterNumber, unit.name)
                          }}
                        >
                          <EditablePreview h="100%" fontSize="sm" fontWeight={isActiveChapter ? "semibold" : "normal"} color={isActiveChapter ? "white" : "gray.500"} _hover={{ backgroundColor: "green.400", textDecoration: "underline" }} />
                          <EditableInput value={newChapterName} onChange={(e) => setNewChapterName(e.target.value)} autoFocus />
                        </Editable>
                      ) : (
                        <Link onClick={() => handleChapterNumberChange(tutorialChapterNumber, unit.name)}>{chapterName}</Link>
                      )}
                    </Flex>
                  )
                })}
            </VStack>
          )
        })}
    </Box>
  )
}

export default ChapterSideBar
