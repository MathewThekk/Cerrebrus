import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';


function HomePage() {
  return (
    <Box
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-b, #4F3BA8, #141E30)"
    >
      <Box textAlign="center">
        <Heading color="white" mb={4}>
          Welcome to Mind Stair!
        </Heading>
        <Text color="white" fontSize="xl" mb={8}>
          Learn it all with our interactive platform.
        </Text>
        <Button colorScheme="purple" size="lg" as={RouterLink} to="/learn/subjectselect">
          Get Started
        </Button>
      </Box>
    </Box>
  );
}

export default HomePage;
