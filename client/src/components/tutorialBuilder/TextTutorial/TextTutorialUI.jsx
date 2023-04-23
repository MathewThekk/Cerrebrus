import { Box, Heading, IconButton, Spacer, Text, Textarea, Image } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import SlideImage from "../SlideImage";

function TextBasedTutorialUI({ slide, handleRemoveSlide, handleBgColorChange, handleTextColorChange, handleFontSizeChange, handleFontChange, handleTextAlignChange, handleImageChange, handleContentChange }) {
  return (
    <Box borderWidth="1px" borderRadius="md" p="4"  bg={slide.bgColor} fontFamily={slide.font} textAlign={slide.textAlign} position="relative">
      <Box display="flex" alignItems="center" justifyContent="space-between" mb="4">
        <Box position="absolute" top="0" right="0">
          <IconButton icon={<CloseIcon />} onClick={() => handleRemoveSlide()} aria-label="Remove slide" variant="ghost" size="sm" />
        </Box>
        <Heading as="h3" size="md">
          Slide
        </Heading>
        <Spacer />
        <Box display="flex" alignItems="center" pr="10">
          <Text fontSize="sm" mr="2">
            Background Color:
          </Text>
          <input type="color" value={slide.bgColor} onChange={(e) => handleBgColorChange(e.target.value)} />
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Text fontSize="sm" mr="2">
          Text Color:
        </Text>
        <input type="color" value={slide.textColor} onChange={(e) => handleTextColorChange(e.target.value)} />
        <Text fontSize="sm" mx="2">
          Font Size:
        </Text>
        <input type="number" min="12" value={slide.fontSize} onChange={(e) => handleFontSizeChange( e.target.value)} style={{ width: "4ch" }} />
        <Box ml="2">
          <select value={slide.font} onChange={(e) => handleFontChange( e.target.value)}>
            <option value="sans-serif">Sans-serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
          </select>
        </Box>
        <Box ml="2">
          <select value={slide.textAlign} onChange={(e) => handleTextAlignChange( e.target.value)}>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </Box>
        <Box ml="2">
          <SlideImage image={slide.image} onImageChange={(image) => handleImageChange( image)} />
        </Box>
      </Box>
      <Box mb="4" height="80vh">
        <Textarea
          value={slide.content}
          onChange={(e) => handleContentChange( e.target.value)}
          color={slide.textColor}
          fontSize={slide.fontSize}
          placeholder="Enter text here..."
          resize="none"
          width="100%"
          height="100%"
          border="none"
          backgroundColor="transparent"
          outline="none"
          _focus={{
            border: "none",
            outline: "none",
          }}
        />
        {slide.image && (
          <Box>
            <Image src={URL.createObjectURL(slide.image)} maxH="200px" position="absolute" top="0" left="0" />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default TextBasedTutorialUI;
