import { Box, Heading } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const LearningPath = () => {
  const subUnits = [
    { id: 1, name: "Atoms" },
    { id: 2, name: "Molecules" },
    { id: 3, name: "Reactions" },
    { id: 4, name: "Stoichiometry" },
  ];

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDir="column"
      justifyContent="flex-start"
      bgGradient="linear(to-b, #4F3BA8, #141E30)"
    >
      <Box flex="1" textAlign="center">
        <Heading color="white" my="8">
          Chemistry Learning Path
        </Heading>
        <Box position="relative">
          {subUnits.map((subUnit, index) => (
            <Box
              key={subUnit.id}
              position="absolute"
              top={index * 150 + 100 + "px"}
              left={index % 2 === 0 ? "30%" : "60%"}
            >
              <RouterLink to={`${subUnit.name.toLocaleLowerCase()}`}>
                <Box
                  as="button"
                  colorScheme="purple"
                  size="xl"
                  p="2"
                  borderRadius="full"
                  _hover={{ opacity: 0.8 }}
                >
                  {subUnit.name}
                </Box>
              </RouterLink>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LearningPath;
