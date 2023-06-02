// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from "react"
import StyledFirebaseAuth from "./StyledFireBaseAuth.tsx"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { Box, Button, VStack, Heading, Text } from "@chakra-ui/react"

// import { getAnalytics } from "firebase/analytics"

// Configure Firebase.
const config = {
  apiKey: "AIzaSyDUanFNG2Njfjz0qKP4Ltdzh9t8fwLY0ws",
  authDomain: "mindstair-b78b5.firebaseapp.com",
  projectId: "mindstair-b78b5",
  storageBucket: "mindstair-b78b5.appspot.com",
  messagingSenderId: "141373915008",
  appId: "1:141373915008:web:5692ddf14e6f544db20b65",
  measurementId: "G-0HEXKMVBGF",
}

// Initialize Firebase
firebase.initializeApp(config)

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

function SignInPage() {
  const [isSignedIn, setIsSignedIn] = useState(false) // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user)
    })
    return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
  }, [])

  return (
    <Box display="flex" justifyContent="center" alignItems="center" bgGradient="linear(to-r, teal.500,green.500)" height="100vh">
      <VStack spacing={8} py={12} px={6} width="full" maxW="md" textAlign="center" bg="white" boxShadow="xl" rounded="lg">
        <Heading size="xl" color="gray.800">
          Mind Stair
        </Heading>
        <Text color="gray.600">{!isSignedIn ? "Please sign-in:" : `Welcome ${firebase.auth().currentUser.displayName}! You are now signed-in!`}</Text>
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

export default SignInPage
