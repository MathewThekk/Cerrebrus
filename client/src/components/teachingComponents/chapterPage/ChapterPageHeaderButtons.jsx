import {  Button,  Box } from "@chakra-ui/react"


const ChapterPageHeaderButtons = ({ tutorial, pageTypeFromUrl, editable, setEditable, editMode, setEditMode, saveContent, toggleColorMode, colorMode, navigate, subject, field, unit, chapter, currentPage }) => (
    <Box mt="3" mr="4">
      {(tutorial || pageTypeFromUrl) && (
        <>
          {(tutorial || pageTypeFromUrl === "text") && (
            <Button mr="2" width="6rem" onClick={() => setEditable(!editable)}>
              {editable ? "Exit Edit" : "Edit"}
            </Button>
          )}
          {pageTypeFromUrl === "quiz" && editMode && (
            <Button
              mr="2"
              width="6rem"
              onClick={() => {
                setEditMode(false)
                navigate(`/learn/${subject}/${field}/${unit}?chapter=${chapter}&page=${currentPage}`)
              }}
            >
              Exit
            </Button>
          )}
          <Button mr="2" width="6rem" onClick={saveContent}>
            {!tutorial ? "Save" : "Update"}
          </Button>
          <Button mr="2" width="6rem" onClick={toggleColorMode}>
            {colorMode === "light" ? "Dark" : "Light"}
          </Button>
        </>
      )}
    </Box>
  )
  
  export default ChapterPageHeaderButtons