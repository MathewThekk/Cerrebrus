import ReactMarkdown from "react-markdown";
import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import React, { useState } from "react";


const Section = ({ title, text }) => {
  return (
  <Box mb={10} maxW="800px">
  <Heading as="h2" size="lg" mb={10}>
  {title}{" "}
  </Heading>
  <ReactMarkdown>{text}</ReactMarkdown>
  </Box>
  );
  };
  
  const SectionList = ({ currentPageSections }) => {
  return (
  <Box mb={5} maxW="800px">
  <Heading as="h1" size="2xl" mb={10}>
  {currentPageSections.title}{" "}
  </Heading>
  {currentPageSections.body.map((content, index) => (
  <Box key={index} mb={10}>
  <Section title={content.title} text={content.text} />
  </Box>
  ))}
  </Box>
  );
  };
  
const TextBasedTutorial = ({ content }) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const goToNextPage = () => {
  if (currentPage < content.sections.length - 1) {
  setCurrentPage(currentPage + 1);
  }
  };
  
  const goToPreviousPage = () => {
  if (currentPage > 0) {
  setCurrentPage(currentPage - 1);
  }
  };
  
  const { sections } = content;
  const totalPages = sections.length;
  const currentPageSections = sections[currentPage];
  
  return (
  <Flex h="100vh" justifyContent="center" alignItems="center" bgGradient="linear(to-b, #4F3BA8, #141E30)">
  <Box maxW="90%" p={8} rounded="lg" bg="white" boxShadow="lg" textAlign="center">
  <SectionList currentPageSections={currentPageSections} />
  <Flex justify="space-between" mt={8}>
  <Button colorScheme="purple" onClick={goToPreviousPage} disabled={currentPage === 0}>
  Previous Page
  </Button>
  <Text color="gray.600" fontWeight="semibold">
  Page {currentPage + 1} of {totalPages}
  </Text>
  <Button colorScheme="purple" onClick={goToNextPage} disabled={currentPage === totalPages - 1}>
  Next Page
  </Button>
  </Flex>
  </Box>
  </Flex>
  );
  };
  
  
  
  export default TextBasedTutorial;