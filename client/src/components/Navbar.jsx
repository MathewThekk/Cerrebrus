import { useState } from "react"
import { useSelector } from "react-redux"

import { Link as RouterLink } from "react-router-dom"
import { Box, Flex, Spacer, Button, useColorMode } from "@chakra-ui/react"

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const { colorMode, toggleColorMode } = useColorMode()

  const tutorial = useSelector((state) => state.tutorialPage)

  const navBarBgColor = colorMode === "light" ? "gray.700" : "gray.700"

  const handleLogOut = () => {
    setIsLoggedIn(false)
  }

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1rem" bg={colorMode === "dark" ? navBarBgColor : "#2E1A47"} color="white">
      <Box>
        <Button variant="ghost" as={RouterLink} to="/">
          Home
        </Button>
        {tutorial && (
          <>
            <Button variant="ghost" as={RouterLink} to="/learn/addtutorial">
              Add Tutorial
            </Button>
            <Button variant="ghost" as={RouterLink} to="/learn/modifytutorial">
              Modify Tutorial
            </Button>
          </>
        )}
      </Box>
      <Spacer />
      <Box display="flex" alignItems="center">
        <Button mr="2" width="6rem" onClick={toggleColorMode}>
          {colorMode === "light" ? "Dark" : "Light"}
        </Button>
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
  )
}

export default NavBar
