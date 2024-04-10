// App.js or index.js
import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MarketAnalysis from './marketAnalysis';
import Introduction from './introduction';
import ExecutiveSummary from './ExecutiveSummary';
import IntroductionTwo from './introduction1';
import ExecutiveSummarys from './executiveSummarys';
import SectionIntro from './sectionIntro';
import ProblemStatement from './problemstatement';
import Conclusion from './conclusion';
import PageCost from './costPage';
import VideoDemo from './video';
import MainApp from './mainApp';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/introduction" element= {<Introduction />} />
        <Route path="/marketAnalysis" element= {<MarketAnalysis />} />
        <Route path="/Introduction1" element= {<IntroductionTwo />} />
        <Route path="/ExecutiveSummary" element= {<ExecutiveSummary />} />
        <Route path="/executiveSummarys" element= {<ExecutiveSummarys />} />
        <Route path="/sectionIntro" element= {<SectionIntro />} />
        <Route path="/problemstatement" element= {<ProblemStatement />} />
        <Route path="/video" element= {<VideoDemo />} />
        <Route path="/conclusion" element={<Conclusion />} />
        <Route path="costPage" element={<PageCost />} />
        <Route path="/" element={<MainApp />} />
      </Routes>
    </Router>
  );
}


export default App