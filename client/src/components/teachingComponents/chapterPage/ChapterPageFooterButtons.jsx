import React from 'react'
import {  Button,  Box, Flex } from "@chakra-ui/react"


const ChapterPageFooterButtons = ({editable, currentPage, handleNextPage, handlePrevPage}) => {
  return (
    <Box>
    {!editable && (
        <Flex  mt = "2" justify= "center" gap =  "1rem" >
          <Button width="8rem" isDisabled={currentPage <= 1} onClick={handlePrevPage}>
            Previous Page
          </Button>
          <Button width="8rem" onClick={handleNextPage}>
            Next Page
          </Button>
        </Flex>
      )}
  
  </Box>
  )
}

export default ChapterPageFooterButtons