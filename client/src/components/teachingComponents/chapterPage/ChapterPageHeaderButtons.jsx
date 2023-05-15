import {  Button,  Box } from "@chakra-ui/react"


const ChapterPageHeaderButtons = ({ tutorial, pageTypeFromUrl, editable, setEditable, saveContent, navigate, subject, field, unit, chapterNumber, currentPage }) => (
    <Box mt="3" mr="4">
      {(tutorial || pageTypeFromUrl) && (
        <>
          {(tutorial) && (
            <Button mr="2" width="6rem" onClick={() => {setEditable(!editable)}}>
              {(editable) ? "Exit Edit" : "Edit"}
            </Button>
          )}
          {(tutorial || pageTypeFromUrl === "quiz") && (
            <Button
              mr="2"
              width="6rem"
              onClick={() => {

                navigate(`/learn/${subject}/${field}/${unit}?chapter=${chapterNumber}&page=${currentPage}`)
              }}
            >
              Exit
            </Button>
          )}
          <Button mr="2" width="6rem" onClick={saveContent}>
            {!tutorial ? "Save" : "Update"}
          </Button>
        </>
      )}
    </Box>
  )
  
  export default ChapterPageHeaderButtons