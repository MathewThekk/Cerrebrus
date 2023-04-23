import ReactMarkdown from 'react-markdown'
import { Box, Heading } from '@chakra-ui/react'

const WrittenTutorial = ({ content }) => {
  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>{content.title}</Heading>
      <ReactMarkdown children={content.body} />
    </Box>
  )
}

export default WrittenTutorial
