import React from 'react'
import {  Button,  Box } from "@chakra-ui/react"


const ChapterPageFooterButtons = ({editable, currentPage, handleNextPage, handlePrevPage}) => {
  return (
    <Box>
    {!editable && (
        <div className="chapterPage-pageNavigation">
          <Button width="8rem" isDisabled={currentPage <= 1} onClick={handlePrevPage}>
            Previous Page
          </Button>
          <Button width="8rem" onClick={handleNextPage}>
            Next Page
          </Button>
        </div>
      )}
  
  </Box>
  )
}

export default ChapterPageFooterButtons