import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'
import NavBar from './components/Navbar'
import SignInPage from './components/SignInPage';
import SubjectSelectPage from './components/SubjectSelectPage'
import FieldSelectPage from './components/FieldSelectPage';
import UnitSelectPage from './components/UnitSelectPage';
import ChemistryPage from './components/subjects/chemistry/ChemistryPage'
import Atoms from './components/subjects/chemistry/Atoms';
import TextTutorialBuilder from './components/tutorialBuilder/TextTutorial/TextTutorialBuilder';
import QuizBuilder from './components/tutorialBuilder/QuizBuilder'
import InteractiveActiveBuilder from './components/tutorialBuilder/InteractiveActivityBuilder'
import CaseStudyBuilder from './components/tutorialBuilder/CaseStudyBuilder'
import AddTutorialSelector from './components/tutorialBuilder/AddTutorialSelector';
import TextBasedTutorial from './components/teachingComponents/TextBasedTutorial';

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
        <Route exact path="/learn/:subject/:field/:unit/chapter" element={<TextBasedTutorial/>} />


        {/* <Route exact path="/learn/science/chemistry/atoms" element={<Atoms/>} />
        <Route exact path="/learn/science/chemistry" element={<ChemistryPage/>} /> */}


        <Route exact path="/learn/:subject/:field/:unit/add-slide" element={<AddTutorialSelector/>} />
        <Route exact path="/learn/:subject/:field/:unit/add-slide/text" element={<TextTutorialBuilder/>} />
        {/* <Route exact path="/learn/:subject/:subsubject/:unit/add-slide/quiz" element={<QuizBuilder/>} />
        <Route exact path="/learn/:subject/:subsubject/:unit/add-slide/interactive" element={<InteractiveActiveBuilder/>} />
        <Route exact path="/learn/:subject/:subsubject/:unit/add-slide/casestudy" element={<CaseStudyBuilder/>} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
