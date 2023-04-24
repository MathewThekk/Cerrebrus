import { useState, useEffect } from "react";
import { Box, Container, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getTutorial } from "../../actions/tutorialActions"
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import TextTutorialBuilder from "../tutorialBuilder/TextTutorial/TextTutorialBuilder";

const TextTutorialViewer = () => {
  const { unit } = useParams();
  const dispatch = useDispatch();
  const tutorial = useSelector((state) => state.tutorials.entities.tutorials);

  useEffect(() => {
    dispatch(getTutorial(unit));
  }, [dispatch, unit]);

  return (
    <Box height="100%">
      <Container maxW="container.lg" display="flex" flexDirection="column" minHeight="100vh">
        <Box pt="4">
          <Heading size="lg">Tutorial</Heading>
        </Box>
        {tutorial ? (
          <Box pt="4">
            {tutorial.sections.map((section, index) => (
              <Box key={index} mb={10} maxW="800px">
                <Heading as="h2" size="lg" mb={10}>
                  {section.title}{" "}
                </Heading>
                <ReactMarkdown>{section.text}</ReactMarkdown>
              </Box>
            ))}
          </Box>
        ) : (
          <TextTutorialBuilder />
        )}
      </Container>
    </Box>
  );
};

export default TextTutorialViewer;
