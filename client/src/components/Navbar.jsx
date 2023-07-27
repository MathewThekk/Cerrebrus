import { useSelector, useDispatch } from "react-redux"
import useLogout from "../utils/useLogout"
import { Link as RouterLink } from "react-router-dom"
import { Box, Flex, Spacer, Button, useColorMode } from "@chakra-ui/react"
import { SET_EDIT_MODE } from "../reducers/learnReducers"

function NavBar() {
  const dispatch = useDispatch()
  const { colorMode, toggleColorMode } = useColorMode()
  const logout = useLogout()
  const user = useSelector((state) => state.user.user)
  const isAdmin = useSelector((state) => state.user?.user?.isAdmin)
  const editMode = useSelector((state) => state.editMode)
  const navBarBgColor = colorMode === "light" ? "gray.700" : "gray.700"
  const showColorModeButton = false


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
        {isAdmin && (
          <Button
            mr="2"
            width="7rem"
            onClick={() => {
              dispatch(SET_EDIT_MODE())
            }}
          >
            {" "}
            {editMode ? "Exit Edit" : "Edit"}{" "}
          </Button>
        )}
       {showColorModeButton && <Button mr="2" width="6rem" onClick={toggleColorMode}>
          {colorMode === "light" ? "Dark" : "Light"}
        </Button>}
        {user ? (
          <Button variant="ghost" onClick={handleLogOut}>
            Log Out
          </Button>
        ) : (
          <Button variant="ghost" as={RouterLink} to="/login">
            Log In
          </Button>
        )}
      </Box>
    </Flex>
  )
}

export default NavBar
