import { Box, Heading, Text, Button, Stack, Image } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

function HomePage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
    >
      <Box textAlign="center" maxWidth="50%" mx="auto"> {/* Here we set a maximum width and auto margins */}
        <Heading color="white" mb={4}>
          Welcome to Mind Stair!
        </Heading>
        <Stack spacing={4} mb="4">
          <Text color="white" fontSize="xl">
            MindStair is on a mission to provide the best interactive education platform for technical topics.
          </Text>
          <Text color="white" fontSize="xl">
            The topics are mainly aimed at non technical professionals, such as product managers, project managers working closely with developers and engineers, aiming to better understand the world of technology.
          </Text>
          <Text color="white" fontSize="xl">
            The site is in development currently. However, you can already click below to get a sneak preview!
          </Text>
          <Box display="flex" justifyContent="center" width="100%">
            <Image src="https://cerrebrus.s3.eu-central-1.amazonaws.com/tutorial_assets/Technical+Product+Management/Common/under-construction90s-90s.gif" alt="Under Construction" width="200px" height="auto" />
          </Box>
        </Stack>
        <Button size="lg" as={RouterLink} to="/learn/product-management/technical-product-management/introduction?chapter=1">
          Get Started
        </Button>
      </Box>
    </Box>
)

}

export default HomePage
