import { Button, Flex, Header } from "@chakra-ui/react"

const ChapterPageHeaderButtons = ({ tutorial, pageTypeFromUrl, editable, setEditable, saveContent, navigate, subject, field, unit, chapterNumber, currentPage, handleAddPage, handleDeletePage }) => (
  <Flex justify="center" mb="2" minW="100%">
    <Button mr="2" width="7rem" onClick={() => { handleAddPage() }} > Add </Button>

    {(tutorial || pageTypeFromUrl) && (
      <>
        {tutorial && (
          <Button mr="2" width="7rem" onClick={() => { setEditable(!editable) }} > {editable ? "Exit Edit" : "Edit"} </Button>
        )}
        <Button mr="2" width="7rem" onClick={saveContent}> {!tutorial ? "Save" : "Update"} </Button>
      </>
    )}
    <Button mr="2" width="7rem" onClick={() => { handleDeletePage() }} > Delete </Button>
    {(tutorial || pageTypeFromUrl === "quiz") && (
      <Button mr="2" width="7rem" onClick={() => { navigate(`/learn/${subject}/${field}/${unit}?chapter=${chapterNumber}&page=${currentPage}`) }} > Exit </Button>
    )}
  </Flex>
)

export default ChapterPageHeaderButtons
