import { Box } from "@chakra-ui/react"
import SubjectPageHeader from "./SubjectPageHeader"
import SubjectPageSelect from "./SubjectPageSelect"
import {  useSelector } from "react-redux"


const SubjectPage = () => {

  const isAdmin = useSelector((state) => state.user?.user?.isAdmin)

  return (
    <Box align="center" maxW="100%" w="100%" h="70vh" maxH="70vh" mt="5">
     {isAdmin && <SubjectPageHeader />}
      <SubjectPageSelect />
    </Box>
  )
}

export default SubjectPage
