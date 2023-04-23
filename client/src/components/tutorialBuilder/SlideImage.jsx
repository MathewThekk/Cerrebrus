import React from "react";
import { Box } from "@chakra-ui/react";

function SlideImage({ image, index, onImageChange })  {
    const handleImageUpload = (e) => {
        const imageFile = e.target.files[0];
        onImageChange(imageFile);
      };
  
  return (
    <Box position="relative">
      
      <Box ml="4">
        <input type="file" onChange={handleImageUpload} />
      </Box>
    </Box>
  );
}

export default SlideImage;
