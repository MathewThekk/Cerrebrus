import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'
import NavBar from './components/Navbar'
import SignInPage from './components/SignInPage';
import SubjectSelectPage from './components/SubjectSelectPage'
import FieldSelectPage from './components/FieldSelectPage';
import UnitSelectPage from './components/UnitSelectPage';



import QuizBuilder from './components/tutorialBuilder/QuizBuilder'
import InteractiveActiveBuilder from './components/tutorialBuilder/InteractiveActivityBuilder'
import CaseStudyBuilder from './components/tutorialBuilder/CaseStudyBuilder'
import AddTutorialSelector from './components/tutorialBuilder/AddTutorialSelector';


import ChapterPage from './components/ChapterPage'

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/"  element={<HomePage/>} />
        <Route exact path="/signin" element={<SignInPage/>} />
        <Route exact path="/learn/subjectselect" element={<SubjectSelectPage/>} />
        <Route exact path="/learn/:subject/fieldselect" element={<FieldSelectPage/>} />
        <Route exact path="/learn/:subject/:field/unitselect" element={<UnitSelectPage/>} />
        <Route path="/learn/:subject/:field/:unit" element={<ChapterPage />}/>
        <Route exact path="/learn/:subject/:field/:unit/addtutorial" element={<AddTutorialSelector />}/>
        <Route exact path="/learn/:subject/:field/:unit/addtutorial/quiz" element={<QuizBuilder />}/>







        {/* <Route exact path="/learn/science/chemistry/atoms" element={<Atoms/>} />
        <Route exact path="/learn/science/chemistry" element={<ChemistryPage/>} /> */}


        {/* <Route exact path="/learn/:subject/:field/:unit/add-slide" element={<AddTutorialSelector/>} /> */}
        {/* <Route exact path="/learn/:subject/:subsubject/:unit/add-slide/quiz" element={<QuizBuilder/>} />
        <Route exact path="/learn/:subject/:subsubject/:unit/add-slide/interactive" element={<InteractiveActiveBuilder/>} />
        <Route exact path="/learn/:subject/:subsubject/:unit/add-slide/casestudy" element={<CaseStudyBuilder/>} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
