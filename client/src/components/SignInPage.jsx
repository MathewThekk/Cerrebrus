import { useState } from "react"
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react"

const SignInPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(`Submitting email ${email} and password ${password}...`)
  }

  const signUp = async (email, password) => {
    try {
      await firebaseApp.auth().createUserWithEmailAndPassword("sibinmathew11@gmail.com", "123")
      console.log("User sign up successful")
    } catch (error) {
      console.error("Sign up error", error)
    }
  }
  signUp()



  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bg="gray.100">
      <Box p={8} maxW="400px" borderWidth={1} borderRadius={8} boxShadow="lg" bg="white">
        <form onSubmit={handleSubmit}>
          <FormControl id="email" mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password" mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button colorScheme="purple" type="submit" width="100%">
            Sign In
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default SignInPage
