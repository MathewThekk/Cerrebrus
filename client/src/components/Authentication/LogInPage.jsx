// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from "react"
import StyledFirebaseAuth from "./StyledFireBaseAuth.tsx"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { Box, Button, VStack, Heading, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// import { getAnalytics } from "firebase/analytics"

// Configure Firebase.
const firebaseDevconfig = {
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_DEV_APP_ID,
  measurementId: process.env.REACT_APP_DEV_MEASUREMENT_ID,
}

const firebaseProdConfig = {
  apiKey: process.env.REACT_APP_PROD_API_KEY,
  authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_PROD_APP_ID,
  measurementId: process.env.REACT_APP_PROD_MEASUREMENT_ID
}
const firebaseConfig = process.env.NODE_ENV === 'production' ? firebaseProdConfig : firebaseDevconfig;

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID, firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
}

function LogInPage() {
  const [isSignedIn, setIsSignedIn] = useState(false) // Local signed-in state.
  const navigate = useNavigate()

  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    if (user) {
      setIsSignedIn(true)
      const lastLocation = localStorage.getItem("lastLocation")
      if (lastLocation) {
        navigate(lastLocation) // history is an instance of `useHistory()`
        localStorage.removeItem("lastLocation")
      } else {
        navigate("/") // Or whatever default location you want
      }
    } else {
      setIsSignedIn(false)
    }
  }, [user, navigate])

  return (
    <Box display="flex" justifyContent="center" alignItems="center" bgGradient="linear(to-r, teal.500,green.500)" height="100vh">
      <VStack spacing={8} py={12} px={6} width="full" maxW="md" textAlign="center" bg="white" boxShadow="xl" rounded="lg">
        <Heading size="xl" color="gray.800">
          Mind Stair
        </Heading>
        <Text color="gray.600">{!isSignedIn ? "Please sign-in:" : `Welcome ${"qq"}! You are now signed-in!`}</Text>
        {!isSignedIn ? (
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        ) : (
          <Button colorScheme="teal" onClick={() => firebase.auth().signOut()}>
            Sign-out
          </Button>
        )}
      </VStack>
    </Box>
  )
}

export default LogInPage
