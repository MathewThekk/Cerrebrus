import React from "react"
import { VStack, Link, Box } from "@chakra-ui/react"
import { ArrowRightIcon } from "@chakra-ui/icons"

const ChapterSideBar = ({ units, chapterNumber, handleChapterNumberChange }) => {
  return (
    <VStack spacing={4} p={3} minW= "17vw" maxW = "17vw" maxH="100%" overflowY="auto" boxShadow="lg" borderRightWidth="5px" >
      {units &&
        Object.values(units).map((unit) => (
          <VStack key={unit._id} spacing={2}>
            <Box fontSize="lg" fontWeight="bold"  pb={1}>
              {unit.name}
            </Box>
            {unit.tutorials.map((tutorial) => (
              <Link 
                key={tutorial._id} 
                fontSize="sm" 
                fontWeight={chapterNumber === tutorial.chapterNumber ? "bold" : "normal"} 
                color={chapterNumber === tutorial.chapterNumber ? "blue.100" : "gray.600"} 
                onClick={() => handleChapterNumberChange(tutorial.chapterNumber) }
                _hover={{ color: 'blue.500', textDecoration: 'underline' }}
                p={2}
              >
                {tutorial.chapterNumber === chapterNumber && <ArrowRightIcon boxSize={4} />}
                {tutorial.chapterName}
              </Link>
            ))}
          </VStack>
        ))}
    </VStack>
  )
}

export default ChapterSideBar
