import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Heading, Button, Flex, VStack } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getSubjects } from "../../../actions/subjectActions"

const SubjectSelectPage = () => {
  const dispatch = useDispatch()
  const subjects = useSelector((state) => state.subjects)

  useEffect(() => {
    dispatch(getSubjects())
  }, [dispatch])

  return (
    <VStack align="center" justify="center" textAlign="center" maxW="100%" w="100%" minH="70vh" mt="5">
      <Heading mb={4}>Choose a subject to learn</Heading>
      <Flex align="center" justify="center" spacing={4} wrap="wrap">
        {subjects &&
          Object.values(subjects).map((subject) => (
            <Button key={subject._id} as={RouterLink} mr="2"  to={`/learn/${subject.name.toLowerCase()}/fieldselect`} _hover={{ opacity: 0.8 }}>
              {subject.name.replace(/-/g, ' ')}
            </Button>
          ))}
      </Flex>
    </VStack>
  )
}

export default SubjectSelectPage
