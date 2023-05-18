import { Button, Flex, Header } from "@chakra-ui/react"

const ChapterPageHeaderButtons = ({ tutorial, pageTypeFromUrl, editable, setEditable, saveContent, navigate, subject, field, unit, chapterNumber, currentPage }) => (
  <Flex justify="center" mb="2"  minW="100%">
    {(tutorial || pageTypeFromUrl) && (
      <>
        {tutorial && (
          <Button
            mr="2"
            width="6rem"
            onClick={() => {
              setEditable(!editable)
            }}
          >
            {editable ? "Exit Edit" : "Edit"}
          </Button>
        )}
        <Button mr="2" width="6rem" onClick={saveContent}>
          {!tutorial ? "Save" : "Update"}
        </Button>
      </>
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

  </Flex>
)

export default ChapterPageHeaderButtons
