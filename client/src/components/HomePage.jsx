import { Box, Heading, Text, Button, Stack } from "@chakra-ui/react"
import { useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"

function HomePage() {


  useEffect({

  },[])
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh" // This assumes you want to center in the full viewport height
      width="100vw" // This ensures the container takes the full viewport width
    >
      <Box textAlign="center">
        <Heading color="white" mb={4}>
          Welcome to Mind Stair!
        </Heading>
        <Stack spacing={4} mb="4">
          <Text color="white" fontSize="xl">
            MindStair is on a mission to provide the best interactive education platform for non technical professionals to understand the world of tech.
          </Text>
          <Text color="white" fontSize="xl">
            The courses are especially aimed at aspiring students or professionals who want to make a career in the tech industry.
          </Text>
          <Text color="white" fontSize="xl">
            The site is in development currently. However, you can already click below to get a sneak preview;)
          </Text>
        </Stack>
        <Button size="lg" as={RouterLink} to="/learn/product-management/technical-product-management/introduction?chapter=1">
          Get Started
        </Button>
      </Box>
    </Box>
  )
}

export default HomePage
