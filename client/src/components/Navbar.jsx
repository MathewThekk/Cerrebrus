import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Flex, Spacer, Button, useColorMode } from '@chakra-ui/react';

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { pathname } = useLocation();

  const { colorMode } = useColorMode();

  const navBarBgColor = colorMode === 'light' ? 'gray.700' : 'gray.700';

  const handleLogOut = () => {
    setIsLoggedIn(false);
  };

  const [isTutorialPage, setIsTutorialPage] = useState(true); // update this to match the specific URL for the tutorial pages

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg={colorMode ==="dark"?navBarBgColor :"#2E1A47"}
      color = "white"
    >
      <Box>
        <Button variant="ghost" as={RouterLink} to="/">
          Home
        </Button>
      </Box>
      <Spacer />
      <Box display="flex" alignItems="center">
        {isTutorialPage && (
          <>
            <Button variant="ghost" as={RouterLink} to="/learn/addtutorial">
              Add Tutorial
            </Button>
            <Button variant="ghost" as={RouterLink} to="/learn/modifytutorial">
              Modify Tutorial
            </Button>
          </>
        )}
        {isLoggedIn ? (
          <Button variant="ghost" onClick={handleLogOut}>
            Log Out
          </Button>
        ) : (
          <Button variant="ghost" as={RouterLink} to="/signin">
            Sign In
          </Button>
        )}
      </Box>
    </Flex>
  );
}

export default NavBar;
