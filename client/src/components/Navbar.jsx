import { useSelector } from "react-redux"
import useLogout from "../utils/useLogout"

import { Link as RouterLink } from "react-router-dom"
import { Box, Flex, Spacer, Button, useColorMode } from "@chakra-ui/react"

function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const logout = useLogout()
  const user = useSelector((state) => state.user.user)

  const navBarBgColor = colorMode === "light" ? "gray.700" : "gray.700"

  const handleLogOut = async () => {
    try {
      logout()
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1rem" bg={colorMode === "dark" ? navBarBgColor : "#2E1A47"} color="white">
      <Box>
        <Button variant="ghost" as={RouterLink} to="/">
          Home
        </Button>
      </Box>
      <Spacer />
      <Box display="flex" alignItems="center">
        <Button mr="2" width="6rem" onClick={toggleColorMode}>
          {colorMode === "light" ? "Dark" : "Light"}
        </Button>
        {user ? (
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
