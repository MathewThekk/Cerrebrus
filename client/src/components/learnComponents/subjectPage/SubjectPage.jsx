import { Box } from "@chakra-ui/react"
import SubjectPageHeader from "./SubjectPageHeader"
import SubjectPageSelect from "./SubjectPageSelect"

const SubjectPage = () => {
  return (
    <Box align="center" maxW="100%" w="100%" h="70vh" maxH="70vh" mt="5">
      <SubjectPageHeader />
      <SubjectPageSelect />
    </Box>
  )
}

export default SubjectPage
