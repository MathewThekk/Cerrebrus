// import React from 'react'
// import { useSelector} from "react-redux"

// import {  Button,  Box, Flex } from "@chakra-ui/react"


// const ChapterPageFooterButtons = ({ currentPage, handleNextPage, handlePrevPage}) => {
//   const editMode = useSelector((state) => state.editMode)

//   return (
//     <Box ml="18%">
//     {!editMode && (
//         <Flex  mt = "2" justify= "center" gap =  "1rem" >
//           <Button width="8rem" isDisabled={currentPage <= 1} onClick={handlePrevPage}>
//             Previous Page
//           </Button>
//           <Button width="8rem" onClick={handleNextPage}>
//             Next Page
//           </Button>
//         </Flex>
//       )}
  
//   </Box>
//   )
// }

// export default ChapterPageFooterButtons