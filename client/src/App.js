/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage"
import NavBar from "./components/Navbar"
// import LogInPage from './components/LogInPage';
import LogInPage from "./components/Authentication/LogInPage"
import SubjectPage from "./components/learnComponents/subjectPage/SubjectPage"
import FieldSelectPage from "./components/learnComponents/fieldPage/FieldSelectPage"
import Test from "./components/Test"
import AddTutorialSelector from "./components/learnComponents/AddTutorialSelector"
import ChapterPage from "./components/learnComponents/chapterPage/ChapterPage"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { syncAuthState } from "./reducers/userReducers"
import { useDispatch, useSelector } from "react-redux"
import useLogout from "./utils/useLogout"
import API from "./api/api"
import ListTutorialsPage from "./components/learnComponents/ListTutorialsPage"
import { SET_SPINNER } from "./reducers/loadingReducer"

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
})

const App = () => {
  const dispatch = useDispatch()
  const logout = useLogout()

  const loading = useSelector((state) => state.loading.loading)


  useEffect(() => {
    dispatch(syncAuthState())
    API.setLogoutCallback(logout)
  }, [])

  useEffect(() => {
    let timer
    if (loading) {
      timer = setTimeout(() => {
        console.log('setting loading spinner')
        if (loading) dispatch(SET_SPINNER(true))
      }, 2000)
    } else {
      clearTimeout(timer)
    }

    // Cleanup on unmount or before running the effect again
    return () => {
      clearTimeout(timer)
    }
  }, [loading])

  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LogInPage />} />
        <Route exact path="/learn/subjectselect" element={<SubjectPage />} />
        <Route exact path="/learn/:subject/fieldselect" element={<FieldSelectPage />} />
        <Route path="/learn/:subject/:field/:unit" element={<ChapterPage />} />
        <Route exact path="/learn/:subject/:field/:unit/addtutorial" element={<AddTutorialSelector />} />
        <Route exact path="/learn/:subject/:field/listtutorials" element={<ListTutorialsPage />} />
        <Route exact path="/test" element={<Test />} />
      </Routes>
    </ChakraProvider>
  )
}

export default App
