import { Box, Button, Center, Container, Heading, HStack, Spacer, Stack } from "@chakra-ui/react"

import { Link, useLocation, useParams } from "react-router-dom"

function AddChapterPageSelector() {
  const { subject, field, unit } = useParams()
  const queryParams = new URLSearchParams(useLocation().search)
  const chapter = parseInt(queryParams.get("chapter"))
  const page = parseInt(queryParams.get("page"))

  const location = useLocation()
  const currentUrl = location.pathname

  const handleModeSelection = (mode) => {}

  // render the appropriate component based on selected mode
  const renderContent = () => {
    return (
      <Center>
        <Stack spacing="4">
          <Heading as="h2" size="xl" textAlign="center">
            Select a chapter mode:
          </Heading>
          <HStack spacing="4">
            <Link to={`/learn/${subject}/${field}/${unit}/chapter=${chapter}&page=${page}&pagetype=text`}>
              <Button>Text Chapter</Button>
            </Link>
            <Link to={`/learn/${subject}/${field}/${unit}/chapter=${chapter}&page=${page}&pagetype=quiz`}>
              <Button>Quiz</Button>
            </Link>
            <Link to={`${currentUrl}/interactive`}>
              <Button onClick={() => handleModeSelection("interactive")}>Interactive Activity</Button>
            </Link>
            <Link to={`${currentUrl}/case`}>
              <Button onClick={() => handleModeSelection("casestudy")}>Case Study</Button>
            </Link>
          </HStack>
        </Stack>
      </Center>
    )
  }

  return (
    <Box height="100vh">
      <Container maxW="container.lg" height="100%" display="flex" flexDirection="column" alignItems="center">
        <Stack spacing="4" height="80%" paddingBottom="4" justifyContent="center">
          {renderContent()}
        </Stack>
        <Spacer />
        <Box position="relative" width="100%" height="150px" display="flex" justifyContent="space-between"></Box>
      </Container>
    </Box>
  )
}

export default AddChapterPageSelector
