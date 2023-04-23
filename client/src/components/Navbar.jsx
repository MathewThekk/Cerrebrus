import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Flex, Spacer, Button } from '@chakra-ui/react';

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { pathname } = useLocation();

  const handleLogOut = () => {
    setIsLoggedIn(false);
  };

  const [isTutorialPage, setIsTutorialPage] = useState(true) // update this to match the specific URL for the tutorial pages

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="purple.800"
      color="white"
    >
      <Box>
        <Button variant="ghost" colorScheme="whiteAlpha" as={RouterLink} to="/">
          Home
        </Button>
      </Box>
      <Spacer />
      <Box display="flex" alignItems="center">
        {isTutorialPage && (
          <>
            <Button colorScheme="whiteAlpha" variant="ghost" as={RouterLink} to="/learn/addtutorial">
              Add Tutorial
            </Button>
            <Button colorScheme="whiteAlpha" variant="ghost" as={RouterLink} to="/learn/modifytutorial">
              Modify Tutorial
            </Button>
          </>
        )}
        {isLoggedIn ? (
          <Button colorScheme="whiteAlpha" variant="ghost" onClick={handleLogOut}>
            Log Out
          </Button>
        ) : (
          <Button colorScheme="whiteAlpha" variant="ghost" as={RouterLink} to="/signin">
            Sign In
          </Button>
        )}
      </Box>
    </Flex>
  );
}

export default NavBar;
