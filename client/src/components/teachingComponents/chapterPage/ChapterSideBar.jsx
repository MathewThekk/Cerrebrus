import React from "react"
import { VStack, Link, Box } from "@chakra-ui/react"
import { ArrowRightIcon } from "@chakra-ui/icons"

const ChapterSideBar = ({ units, chapterNumber, unit:unitName, handleChapterNumberChange }) => {
  
  // Function to filter unique chapter numbers
  const getUniqueChapters = (tutorials) => {
    const tutorialMap = new Map();
    tutorials.forEach(tutorial => {
      if (!tutorialMap.has(tutorial.chapterNumber)) {
        tutorialMap.set(tutorial.chapterNumber, tutorial);
      }
    });
    return Array.from(tutorialMap.values());
  };

  return (
    <VStack spacing={4} p={3} minW="17vw" maxW="17vw" maxH="100%" overflowY="auto" boxShadow="lg" borderRightWidth="5px">
      {units &&
        Object.values(units).map((unit) => (
          <VStack key={unit._id} spacing={2}>
            <Box fontSize="lg" fontWeight="bold" pb={1}>
              {unit.name}
            </Box>

            {getUniqueChapters(unit.tutorials).map((tutorial) => {
              const { _id, chapterNumber: tutorialChapterNumber, chapterName } = tutorial;

              const isActiveChapter = (chapterNumber === tutorialChapterNumber && unitName === unit.name.toLowerCase());

              return (
                <Link
                  key={_id}
                  fontSize="sm"
                  fontWeight="bold"
                  color={isActiveChapter ? "white" : "gray.600"}
                  backgroundColor={isActiveChapter ? "blue.500" : "transparent"}
                  p={isActiveChapter ? 2 : 1}
                  borderRadius="md"
                  onClick={() => handleChapterNumberChange(tutorialChapterNumber, unit.name)}
                  _hover={{ color: "blue.500", textDecoration: "underline" }}
                >
                  {chapterName}
                </Link>
              )
            })}
          </VStack>
        ))}
    </VStack>
  );
};


export default ChapterSideBar
