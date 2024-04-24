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
import SignUp from './signUp';
import Welcome from './welcome';
import DeleteModal from './component/deleteModal';
import PageSummarys from './pageSummarys';
import PageSummary from './pageSummary';
import Financials from './Financials';
import RiskMitigation from './mitigation';
import Implementation from './implementation';
import SectionExecute from './sectionSummary';
import PageGovernance from './govPage';
import PageIntro from './pageIntro';
import PageBusiness from './pageBusiness';
import CashFlow from './Sectiondcf';
import SettingMenu from './component/settingMenu';
import GiveFeedbackModal from './component/giveFeedbackModal';
import SectiondcfTwo from './SectiondcfTwo';
import Sectiondcf3 from './SectionDiscount';
import SectionPrototype from './sectionPrototype';
import PageCustomer from './pageCustomer';
import CustomerSegment from './customerSegment';
import PageMarketing from './marketing';
import PagePositioning from './pagePositioning';
import PageProject from './pageProject';
import PageSuccess from './pageSuccess';
import UploadLogo from './uploadLogo';
import GraphPage from './graphPage';
import ViewSheetModal from './viewSheetModal';
import ViewDocument from './viewDocument';
import Password from './password';
import PageInvite from './sectionInvite';
import PageTrack from './pageTrack';
import Summary from './summary';
import SearchKpi from './searchKpi';
import PageSub from './pageSub';
import Prototype from './prototype';
import PageFrontView from './pageFrontView';
import PlanDesign from './planDesign';
import PitchDeck from './pitchDeck';
import Privacy from './privacy';
import Engagement from './engagement';
import AllFiles from './allFiles';
import HomeStarter from './homeStarter';
import WireFrame from './wireFrame';
import IncomeGraph from './incomeGraph';
import SectionScale from './sectionScale';
import Presentation from './presentation';
import Model from './model';
import TermAgreement from './termAgreement';
import Comparative from './comparative';
import YearOnYear from './yearOnYear';
import FinancialProject from './financialP';
import GrowthRateGraph from './growthRateGraph';
import NetGraph from './netGraph';
import SectionExe from './sectionExecute';
import PageShare from './pageShare';
import SendFile from './sendFile';
import GeneralSetting from './generalSetting';
import SectionManagement from './sectionManagement';
import TeamManagement from './teamManagement';
import ShareFile from './shareFile';
import MonthOnMonth from './monthOnmonth';
import ClaimDomain from './claimDomain';
import PageTeam from './pageTeam';
import MainApp from './mainApp';
import Profile from './profile';
import ChatTools from './chatTool';
import KPIPage from './kpiPage';
import Login from './login';
import LandingPage from './landing';
import LoadingPage from './laodingPage';
import PageAddKpi from './pageAddKpi';
import GoPage from './goPage';








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
        <Route path="/viewSheetModal" element= {<ViewSheetModal />} />
        <Route path="/problemstatement" element= {<ProblemStatement />} />
        <Route path="/Solution" element= {<Solution />} />
        <Route path="/pageShare" element= {<PageShare />} />
        <Route path="/pageBenefit" element= {<PageBenefit />} />
        <Route path="/viewDocument" element= {<ViewDocument />} />
        <Route path="/video" element= {<VideoDemo />} />
        <Route path="/model" element= {<Model />} />
        <Route path="/pageSub" element= {<PageSub />} />
        <Route path="/termAgreement" element= {<TermAgreement />} />
        <Route path="/privacy" element= {<Privacy />} />
        <Route path="/comparative" element= {<Comparative />} />
        <Route path="/monthOnmonth" element= {<MonthOnMonth/>} />
        <Route path="/yearOnyear" element= {<YearOnYear />} />
        <Route path="/settingMenu" element= {<SettingMenu />} />
        <Route path="/financialP" element= {<FinancialProject />} />
        <Route path="/chatTool" element= {<ChatTools />} />
        <Route path="/giveFeedbackModal" element= {<GiveFeedbackModal />} />
        <Route path="/welcome" element= {<Welcome />} />
        <Route path="/password" element= {<Password />} />
        <Route path="/deleteModal" element= {<DeleteModal />} />
        <Route path="/growthRateGraph" element= {<GrowthRateGraph />} />
        <Route path="/netGraph" element= {<NetGraph/>} />
        <Route path="/profile" element= {<Profile />} />
        <Route path="/incomeGraph" element= {<IncomeGraph />} />
        <Route path="/homeStarter" element= {<HomeStarter />} />
        <Route path="/generalSetting" element= {<GeneralSetting />} />
        <Route path="/pageSummary" element= {<PageSummary />} />
        <Route path="/allFiles" element= {<AllFiles />} />
        <Route path="/searchKpi" element= {<SearchKpi />} />
        <Route path="/pageAddKpi" element= {<PageAddKpi />} />
        <Route path="/prototype" element= {<Prototype />} />
        <Route path="/sendFile" element= {<SendFile />} />
        <Route path="/graphPage" element= {<GraphPage />} />
        <Route path="/wireFrame" element= {<WireFrame />} />
        <Route path="/login" element= {<Login />} />
        <Route path="/signUp" element= {<SignUp />} />
        <Route path="/sectionManagement" element= {<SectionManagement />} />
        <Route path="/teamManagement" element= {<TeamManagement />} />
        <Route path="/uploadLogo" element= {<UploadLogo />} />
        <Route path="/Sectiondcf" element= {<CashFlow />} />
        <Route path="/sectionInvite" element= {<PageInvite />} />
        <Route path="/pageTeam" element= {<PageTeam />} />
        <Route path="/pageProject" element= {<PageProject/>} />
        <Route path="/pageSuccess" element= {<PageSuccess />} />
        <Route path="/kpiPage" element= {<KPIPage />} />
        <Route path="/engagement" element= {<Engagement />} />
        <Route path="/summary" element= {<Summary />} />
        <Route path="/presentation" element= {<Presentation />} />
        <Route path="/pageFrontView" element= {<PageFrontView />} />
        <Route path="/shareFile" element= {<ShareFile />} />
        <Route path="/planDesign" element= {<PlanDesign />} />
        <Route path="/pageTrack" element= {<PageTrack />} />
        <Route path="/pitchDeck" element= {<PitchDeck />} />
        <Route path="/sectionScale" element= {<SectionScale />} />
        <Route path="/claimDomain" element= {<ClaimDomain />} />
        <Route path="/sectionExecute" element= {<SectionExe />} />
        <Route path="/SectiondcfTwo" element= {<SectiondcfTwo />} />
        <Route path="/SectionDiscount" element= {<Sectiondcf3 />} />
        <Route path="/sectionPrototype" element= {<SectionPrototype />} />
        <Route path="/pageCustomer" element= {<PageCustomer />} />
        <Route path="/marketing" element= {<PageMarketing />} />
        <Route path="/pagePositioning" element= {<PagePositioning />} />
        <Route path="/customerSegment" element= {<CustomerSegment />} />
        <Route path="/pageBusiness" element= {<PageBusiness/>} />
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
        <Route path="/go" element= {<GoPage />} />
        {/* <Route path="/login" element= {<Login />} /> */}
        <Route path="/loading" element= {<LoadingPage />} />
        <Route path="/" element={<Login />} />
        // <Route path="/" element={<MainApp />} />
      </Routes>
    </Router>
  );
}


export default App
