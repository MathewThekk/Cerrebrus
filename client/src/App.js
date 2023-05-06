import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'
import NavBar from './components/Navbar'
import SignInPage from './components/SignInPage';
import SubjectSelectPage from './components/SubjectSelectPage'
import FieldSelectPage from './components/FieldSelectPage';
import UnitSelectPage from './components/UnitSelectPage';
import Test from './components/Test';
import AddTutorialSelector from './components/tutorialBuilder/AddTutorialSelector';
import ChapterPage from './components/ChapterPage'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});


const App = () => {
  return (
    <BrowserRouter>
    <ChakraProvider theme={theme}>
      <NavBar />
      <Routes>
        <Route exact path="/"  element={<HomePage/>} />
        <Route exact path="/signin" element={<SignInPage/>} />
        <Route exact path="/learn/subjectselect" element={<SubjectSelectPage/>} />
        <Route exact path="/learn/:subject/fieldselect" element={<FieldSelectPage/>} />
        <Route exact path="/learn/:subject/:field/unitselect" element={<UnitSelectPage/>} />
        <Route path="/learn/:subject/:field/:unit" element={<ChapterPage />}/>
        <Route exact path="/learn/:subject/:field/:unit/addtutorial" element={<AddTutorialSelector />}/>
        <Route exact path="/test" element={<Test/>}/>









        {/* <Route exact path="/learn/science/chemistry/atoms" element={<Atoms/>} />
        <Route exact path="/learn/science/chemistry" element={<ChemistryPage/>} /> */}


        {/* <Route exact path="/learn/:subject/:field/:unit/add-slide" element={<AddTutorialSelector/>} /> */}
        {/* <Route exact path="/learn/:subject/:subsubject/:unit/add-slide/quiz" element={<QuizBuilder/>} />
        <Route exact path="/learn/:subject/:subsubject/:unit/add-slide/interactive" element={<InteractiveActiveBuilder/>} />
        <Route exact path="/learn/:subject/:subsubject/:unit/add-slide/casestudy" element={<CaseStudyBuilder/>} /> */}
      </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default App;
