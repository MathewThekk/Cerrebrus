/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { getUnits } from "../../actions/unitActions"
import { VStack, Link, Box, Flex, Editable, EditablePreview, EditableInput, HStack } from "@chakra-ui/react"
import { updateTutorialChapterNumber } from "../../actions/tutorialActions"

// import { updateChapterNumber } from "../../actions/tutorialActions"

const ListTutorialsPage = ({ handleUnitChange }) => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { unit: unitName, subject, field } = useParams()

  const units = useSelector((state) => state.units)

  const currenTutorials = useSelector((state) => state.tutorials)
  const editMode = useSelector((state) => state.editMode)

  const populateTutorial = true

  // Inside your ListTutorialsPage component
  const [newChapterNumber, setNewChapterNumber] = useState(null)

  // A helper function to handle the change of chapterNumber
  const handleChapterNumberUpdate = (newChapterNumber, tutorialId) => {
    dispatch(updateTutorialChapterNumber(newChapterNumber, tutorialId))
  }

  useEffect(() => {
    if (subject && field && populateTutorial === true) dispatch(getUnits(subject, field, populateTutorial))
    if (unitName === "unitselect") {
      if (units.length > 0) {
        navigate(`/learn/${subject}/${field}/${units[0].name.toLowerCase()}?chapter=${1}`)
      }
    }
  }, [currenTutorials, units.length])

  console.log(units)

  return (
    <Box align="center" minH="100%" maxH="100%" overflow="auto" boxShadow="lg" borderRight="5px solid" borderColor="black">
      <Box p="5" fontWeight="900" fontFamily="Arial, sans-serif" fontSize="xl" align="center">
        Technical Product Management
      </Box>
      {units &&
        Object.values(units).map((unit) => {
          const sortedTutorialIds = [...unit.tutorialIds].sort((a, b) => a.chapterNumber - b.chapterNumber)
          return (
            <VStack key={unit._id} spacing="0">
              <Flex w="100%" justify="center">
                <Link fontSize="md" fontWeight="bold" p={3} onClick={() => handleUnitChange(unit.name)} _hover={{ backgroundColor: "blue.400", textDecoration: "underline" }}>
                  {unit.name.replace(/-/g, " ").toUpperCase()}
                </Link>
              </Flex>

              {unit?.tutorialIds?.length > 0 &&
                sortedTutorialIds.map((t) => {
                  // For each chapter, render chapter number and title once,
                  // then map over the pages and render each page

                  return (
                    <HStack key={t._id}>
                      {editMode && (
                        <Editable
                          defaultValue={t.chapterNumber}
                          onSubmit={(newChapterNumber) => {
                            handleChapterNumberUpdate(newChapterNumber, t._id)
                          }}
                        >
                          <EditablePreview h="100%" fontSize="sm" _hover={{ backgroundColor: "green.400", textDecoration: "underline" }} />
                          <EditableInput value={newChapterNumber} onChange={(e) => setNewChapterNumber(e.target.value)} autoFocus />
                        </Editable>
                      )}
                      <h2>
                        Chapter {t.chapterNumber}: {t.chapterName}
                      </h2>
                    </HStack>
                  )
                })}
            </VStack>
          )
        })}
    </Box>
  )
}

export default ListTutorialsPage
