import React from "react"
import { Flex, Box, Button, Heading } from "@chakra-ui/react"
import { useState } from "react"
import { addAdditionalInformation, deleteAdditionalInformation } from "../../../actions/AdditionalInformationAction"
import { useDispatch, useSelector } from "react-redux"
import TipTapEditor from "../textEditor/TipTapEditor"

const ChapterAdditionalInformationSection = ({ editable }) => {
  const dispatch = useDispatch()

  const [additionalInformation, setAdditionalInformation] = useState("")

  const tutorialPage = useSelector((state) => state.tutorialPage)

  const handleSave = () => {
    console.log("adding additional info")
    dispatch(addAdditionalInformation(additionalInformation, tutorialPage._id))
  }

  const handleDelete = () => {
    console.log("deleting additional info")
    dispatch(deleteAdditionalInformation(tutorialPage._id))
  }

  return (
    <Box ml="19%" pt="10"  maxW="80vw" p={5}>
      <Heading size="lg" mb={5}>
        Additional Information
      </Heading>
      <Flex id="additionalInformationEditor" >
        <TipTapEditor content={tutorialPage.additionalInformationContent} editable={editable} setContent={setAdditionalInformation} />
      </Flex>
      {editable && (
        <Flex mt={5}>
          <Button width="6rem" mr={5} onClick={handleSave}>
            Save
          </Button>
          <Button width="6rem" onClick={handleDelete} colorScheme="blue">
            Clear
          </Button>
        </Flex>
      )}
    </Box>
  )
}

export default ChapterAdditionalInformationSection
