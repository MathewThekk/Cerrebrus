import { useState } from "react";
import { Box, Button, Center, Container, Heading, HStack, Spacer, Stack } from "@chakra-ui/react";
import QuizBuilder from "./QuizBuilder";
import InteractiveActivityBuilder from "./InteractiveActivityBuilder";
import CaseStudyBuilder from "./CaseStudyBuilder";
import { Link, useLocation, useNavigate } from "react-router-dom";


function AddTutorial() {
  const [selectedMode, setSelectedMode] = useState(null);

  const navigate = useNavigate()
  const location = useLocation()
  const currentUrl = location.pathname

  const handleModeSelection = (mode) => {
    setSelectedMode(mode);
  };

  // render the appropriate component based on selected mode
  const renderContent = () => {
        return (
          <Center>
            <Stack spacing="4">
              <Heading as="h2" size="xl" textAlign="center">
                Select a tutorial mode:
              </Heading>
              <HStack spacing="4">
                <Link to= {`${currentUrl}/text`}>
                  <Button onClick={() => handleModeSelection("text")}>Text Tutorial</Button>
                </Link>
                <Link to={`${currentUrl}/quiz`}>
                  <Button onClick={() => handleModeSelection("quiz")}>Quiz</Button>
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
        );
    }
  
  return (
    <Box height="100vh">
      <Container maxW="container.lg" height="100%" display="flex" flexDirection="column" alignItems="center">
        <Stack spacing="4" height="80%" paddingBottom="4" justifyContent="center">
          {renderContent()}
        </Stack>
        <Spacer />
        <Box position="relative" width="100%" height="150px" display="flex" justifyContent="space-between">
        </Box>
      </Container>
    </Box>
  );
}

export default AddTutorial;
