import { useState, useEffect } from "react";
import { Box, Button, Container, Heading, IconButton, Spacer } from "@chakra-ui/react";
import { ArrowBackIcon, AddIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import TextBasedTutorialUI from "./TextTutorialUI";
import { useDispatch } from "react-redux";
import { addTutorial } from "../../../actions/tutorialActions";
import { useLocation, useParams } from "react-router-dom";

const TextTutorialBuilder = () => {

  const dispatch = useDispatch();
const {subject, field, unit} = useParams();

 

  const page = 1;
 
  const [slide, setSlide] = useState({
    content: "",
    font: "sans-serif",
    image: null,
    bgColor: "#FFFFFF",
    textColor: "#000000",
    fontSize: 16,
    textAlign: "left",
  });

  const handleContentChange = (content) => {
    setSlide((prevState) => ({ ...prevState, content }));
  };

  const handleFontChange = (font) => {
    console.log(font);
    setSlide((prevState) => ({ ...prevState, font }));
  };

  const handleImageChange = (image) => {
    setSlide((prevState) => ({ ...prevState, image }));
  };

  const handleBgColorChange = (color) => {
    setSlide((prevState) => ({ ...prevState, bgColor: color }));
  };

  const handleTextColorChange = (color) => {
    setSlide((prevState) => ({ ...prevState, textColor: color }));
  };

  const handleFontSizeChange = (size) => {
    setSlide((prevState) => ({ ...prevState, fontSize: size }));
  };

  const handleTextAlignChange = (align) => {
    setSlide((prevState) => ({ ...prevState, textAlign: align }));
  };

  const handleAddTutorial = () => {
    console.log(1)
    dispatch(addTutorial(slide, page, unit, field, subject));
  };

  return (
    <Box height="100%">
      <Container maxW="container.lg" display="flex" flexDirection="column" minHeight="100vh">
        <Box pt="4">
          <Button as={RouterLink} to="/" leftIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </Box>
        <Box pt="4" pb="4" display="flex" alignItems="center">
          <Heading size="lg">Create Tutorial</Heading>
          <Spacer />
          <Button
            mr="5"
            colorScheme="blue"
            onClick={() =>
              setSlide({
                content: "",
                font: "sans-serif",
                image: null,
                bgColor: "#FFFFFF",
                textColor: "#000000",
                fontSize: 16,
                textAlign: "left",
              })
            }
            leftIcon={<AddIcon />}
          >
            New Slide
          </Button>
          <Button colorScheme="blue" onClick={() => handleAddTutorial()}>
            Add Tutorial
          </Button>
        </Box>
        <TextBasedTutorialUI
          slide={slide}
          handleBgColorChange={handleBgColorChange}
          handleTextColorChange={handleTextColorChange}
          handleFontSizeChange={handleFontSizeChange}
          handleTextAlignChange={handleTextAlignChange}
          handleContentChange={handleContentChange}
          handleFontChange={handleFontChange}
          handleImageChange={handleImageChange}
        />
      </Container>
    </Box>
  );
}

export default TextTutorialBuilder;
