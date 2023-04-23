import { Textarea } from '@chakra-ui/react';

function TextBox(props) {
  const { content, handleContentChange, fontSize, textColor } = props;

  return (
    <Textarea
      value={content}
      onChange={(e) => handleContentChange(e.target.value)}
      placeholder="Enter text here..."
      resize="none"
      width="100%"
      height="100%"
      border="none"
      backgroundColor="transparent"
      outline="none"
      _focus={{
        border: 'none',
        outline: 'none',
      }}
      fontSize={fontSize}
      color={textColor}
    />
  );
}

export default TextBox;
