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
import PageBenefit from './pageBenefit';
import Solution from './Solution';
import Conclusion from './conclusion';
import PageCost from './costPage';
import VideoDemo from './video';
import PageSummarys from './pageSummarys';
import Financials from './Financials';
import RiskMitigation from './mitigation';
import Implementation from './implementation';
import SectionExecute from './sectionSummary';
import PageGovernance from './govPage';
import PageIntro from './pageIntro';
import PageBusiness from './pageBusiness';
import CashFlow from './Sectiondcf';
import SectiondcfTwo from './SectiondcfTwo';
import Sectiondcf3 from './SectionDiscount';
import SectionPrototype from './sectionPrototype';
import PageCustomer from './pageCustomer';
import CustomerSegment from './customerSegment';
import PageMarketing from './marketing';
import PagePositioning from './pagePositioning';
import PageProject from './pageProject';
import PageSuccess from './pageSuccess';
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
        <Route path="/Solution" element= {<Solution />} />
        <Route path="/pageBenefit" element= {<PageBenefit />} />
        <Route path="/video" element= {<VideoDemo />} />
        <Route path="/Sectiondcf" element= {<CashFlow />} />
        <Route path="/pageProject" element= {<PageProject/>} />
        <Route path="/pageSuccess" element= {<PageSuccess />} />
        <Route path="/SectiondcfTwo" element= {<SectiondcfTwo />} />
        <Route path="/SectionDiscount" element= {<Sectiondcf3 />} />
        <Route path="/sectionPrototype" element= {<SectionPrototype />} />
        <Route path="/pageCustomer" element= {<PageCustomer />} />
        <Route path="/marketing" element= {<PageMarketing />} />
        <Route path="/pagePositioning" element= {<PagePositioning />} />
        <Route path="/customerSegment" element= {<CustomerSegment />} />
        <Route path="/pageBuisness" element= {<PageBusiness/>} />
        <Route path="/pageIntro" element= {<PageIntro />} />
        <Route path="/pageSummarys" element= {<PageSummarys />} />
        <Route path="/sectionSummary" element= {<SectionExecute />} />
        <Route path="/govPage" element= {<PageGovernance />} />
        <Route path="/sectionSummary" element= {<VideoDemo />} />
        <Route path="/implementation" element= {<Implementation />} />
        <Route path="/mitigation" element= {<RiskMitigation />} />
        <Route path="/Financials" element= {<Financials />} />
        <Route path="/conclusion" element={<Conclusion />} />
        <Route path="costPage" element={<PageCost />} />
        <Route path="/home" element= {<LandingPage />} />
        {/* <Route path="/login" element= {<Login />} /> */}
        <Route path="/loading" element= {<LoadingPage />} />
        <Route path="/" element={<Login />} />
        // <Route path="/" element={<MainApp />} />
      </Routes>
    </Router>
  );
}


export default App
