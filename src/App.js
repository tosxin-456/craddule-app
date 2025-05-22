// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { clarity } from 'react-microsoft-clarity';

// Authentication & User Management
import Login from './login';
import SignUp from './signUp';
import LoginTeam from './loginStart';
import SignUpTeam from './signUpStart';
import LoginShare from './sharelogin';
import EmailConfirmation from './confirmEmail';
import Password from './password';
import Profile from './profile';

// Legal & Terms
import TermAgreement from './termAgreement';
import Privacy from './privacy';
import Nda from './nda';

// Onboarding & Getting Started
import Start from './start';
import HomeStarter from './homeStarter';
import LandingPage from './landing';
import QuestionsForm from './component/questionsForm';
import CreateProject from './createProject';
import CreateQuestion from './createQuestion';

// Phase Onboarding
import IdeationPage from './component/ideationOnboarding';
import ValidatingOnboarding from './validatingAndTesting';
import CommersialzationOnboarding from './commersializationOnboarding';
import DesignOnboarding from './designOnboarding';
import ProductionOnboarding from './productionOnboarding';

// Core Business Pages
import PageIntro from './pageIntro';
import PageBusiness from './pageBusiness';
import PageCustomer from './pageCustomer';
import CustomerSegment from './customerSegment';
import PageMarketing from './marketing';
import PagePositioning from './pagePositioning';
import PageProject from './pageProject';
import PageSuccess from './pageSuccess';
import GoPage from './goPage';

// Financial Analysis & Projections
import CustomFinancial from './customFinancial';

// Financial Metrics & KPIs
import KPIPage from './kpiPage';
import PageAddKpi from './pageAddKpi';
import CreateKpi from './kpiCreate';
import EditKpi from './kpiEdith';
import Kpi from './kpi';
import KpiView from './kpiView';
import SearchKpi from './searchKpi';

// Financial Charts & Analysis
import Expenses from './expenses';
import CustomerInflux from './customerInflux';
import CustomerGrowth from './customerGrowth';
import OperatingIncome from './operatingIncome';
import NetProfit from './netProfit';
import Inflation from './inflationRate';

// Financial Graph Views
import ViewExpensesGraph from './expensesGraphView';
import ViewInflation from './inflationRateGraphView';
import ViewNetProfitGraph from './netProfitGraphView';
import ViewOperatingIncomeGraph from './operatingIncomeGraphView';
import ViewCustomerGrowthGraph from './customerGrowthGraphView';
import ViewCustomerInfluxGraph from './customerInfluxGraphView';

// Financial Creation & Editing
import CreateInflation from './inflationRateCreate';
import CreateOperatingIncome from './operatingIncomeCreate';
import CreateExpenses from './expensesCreate';
import CreateNetProfit from './netProfitCreate';
import CreateCustomerGrowth from './customerGrowthCreate';
import CreateCustomerInflux from './customerInfluxCreate';
import EditInflation from './inflationRateEdit';
import EditOperatingIncome from './operatingIncomeEdit';
import EditExpenses from './expensesEdit';
import EditNetProfit from './netProfitEdit';
import EditCustomerGrowth from './customerGrowthEdit';
import EditCustomerInflux from './customerInfluxEdit';

// Prototyping & Design
import WireFrame from './wireFrame';

// Pitch Deck & Presentations
import PitchDeck from './pitchDeck';
import PitchDeckStart from './pitchDeckStart';
import PitchDeckUpload from './pitchDeckUpload';
import PitchDeckView from './pitchDeckView';
import PitchDeckResources from './pitchDeckResources';
import PitchDeckLectures from './pitchDeckLectures';
import Presentation from './presentation';

// Branding & Design
import Branding from './branding';
import BrandingUpload from './brandingUpload';

// Team Management
import TeamView from './teamView';
import TeamAdd from './teamAdd';

// File Management
import Upload from './upload';
import AllFiles from './allFiles';
import FilesList from './allFilesSubType';
import Craddule from './craddule';
import CradduleType from './cradduleFile';
import Subfolder from './subfolder';
import SubFolderUpload from './subfolderupload';

// Image & Media Management
import CreateVideo from './createVideo';
import CreateVideosAdmin from './createVideosAdmin';
import InspVideo from './inspVideo';

// Task & Project Management
import CreateTask from './taskCreate';
import UploadTask from './timelineUpload';

// Sharing & Collaboration
import Share from './share';
import ShareReview from './shareReview';
import ShareView from './sectionIntroShare';
import ShareFeedback from './sectionFeedback';
import SharePhase from './sharePhase';

// Feedback & Communication
import PageFeedback from './pageFeedback';
import Chat from './chat';
import CreateQuote from './createQuote';

// Summary & Reports
import PhaseSummary from './PhaseSummary';

// Settings & Configuration
import GeneralSetting from './generalSetting';

// Miscellaneous & Utilities
import Accelerate from './accelerate';
import ScrapCreate from './scrapCreate';
import ScrapCreateName from './scrapCreateName';
import ScrapView from './scrapView';

// AI & Testing
import QuestionOptions from './TestAi';

function App() {
  const [isTrialExpired, setIsTrialExpired] = useState(false);
  clarity.init('ocijdfgrpz');

  const subscribed = localStorage.getItem('subscribed') === 'true';

  useEffect(() => {
    if (subscribed) {
      setIsTrialExpired(false);
    } else {
      setIsTrialExpired(true);
    }
  }, [subscribed]);

  return (
    <GoogleOAuthProvider clientId="652982067595-5ib81dgbepeqevr3868739t1bg4phrmm.apps.googleusercontent.com">
      <Router>
        <Routes>
          {/* Authentication Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/:referralCode" element={<SignUp />} />
          <Route path="/login/start/:id/" element={<LoginTeam />} />
          <Route path="/signup/start/:id/" element={<SignUpTeam />} />
          <Route path="/share/login/:id/" element={<LoginShare />} />
          <Route path="/confirm-email" element={<EmailConfirmation />} />
          <Route path="/password" element={<Password />} />
          <Route path="/profile" element={<Profile />} />

          {/* Legal & Terms Routes */}
          <Route path="/terms&conditions" element={<TermAgreement />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/nda/" element={<Nda />} />

          {/* Getting Started Routes */}
          <Route path="/home" element={<LandingPage />} />
          <Route path="/start/" element={<Start />} />
          <Route path="/homeStarter" element={<HomeStarter />} />
          <Route path="/welcome-form" element={<QuestionsForm />} />
          <Route path="/createProject" element={<CreateProject />} />
          <Route path="/createQuestion" element={<CreateQuestion />} />

          {/* Phase Onboarding Routes */}
          <Route path="/ideation" element={<IdeationPage />} />
          <Route path="/ValidatingAndTesting" element={<ValidatingOnboarding />} />
          <Route path="/Commercialization" element={<CommersialzationOnboarding />} />
          <Route path="/InitialDesign" element={<DesignOnboarding />} />
          <Route path="/ProductDefinition" element={<ProductionOnboarding />} />

          {/* Core Business Routes */}
          <Route path="/pageIntro" element={<PageIntro />} />
          <Route path="/pageBusiness" element={<PageBusiness />} />
          <Route path="/pageCustomer" element={<PageCustomer />} />
          <Route path="/customerSegment" element={<CustomerSegment />} />
          <Route path="/marketing" element={<PageMarketing />} />
          <Route path="/pagePositioning" element={<PagePositioning />} />
          <Route path="/pageProject" element={<PageProject />} />
          <Route path="/pageSuccess" element={<PageSuccess />} />
          <Route path="/go/:phase" element={<GoPage />} />

          {/* Financial Analysis Routes */}
          <Route path="/customFinancial/" element={<CustomFinancial />} />

          {/* KPI & Metrics Routes */}
          <Route path="/kpiPage" element={<KPIPage />} />
          <Route path="/pageAddKpi" element={<PageAddKpi />} />
          <Route path="/createKpi/" element={<CreateKpi />} />
          <Route path="/kpiEdit/:id" element={<EditKpi />} />
          <Route path="/kpi/" element={<Kpi />} />
          <Route path="/kpiview/:id" element={<KpiView />} />
          <Route path="/searchKpi" element={<SearchKpi />} />

          {/* Financial Charts & Analysis Routes */}
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/customerInflux" element={<CustomerInflux />} />
          <Route path="/customerGrowth" element={<CustomerGrowth />} />
          <Route path="/operatingIncome" element={<OperatingIncome />} />
          <Route path="/netProfit" element={<NetProfit />} />
          <Route path="/inflation/" element={<Inflation />} />

          {/* Financial Graph View Routes */}
          <Route path="/expensesGraphView/:id" element={<ViewExpensesGraph />} />
          <Route path="/inflationGraphView/:id" element={<ViewInflation />} />
          <Route path="/netProfitGraphView/:id" element={<ViewNetProfitGraph />} />
          <Route path="/operatingIncomeGraphView/:id" element={<ViewOperatingIncomeGraph />} />
          <Route path="/customerGrowthGraphView/:id" element={<ViewCustomerGrowthGraph />} />
          <Route path="/customerInfluxGraphView/:id" element={<ViewCustomerInfluxGraph />} />
          <Route path="/viewInflation/" element={<ViewInflation />} />

          {/* Financial Creation Routes */}
          <Route path="/inflationCreate/" element={<CreateInflation />} />
          <Route path="/operatingIncomeCreate/" element={<CreateOperatingIncome />} />
          <Route path="/expensesCreate/" element={<CreateExpenses />} />
          <Route path="/netProfitCreate/" element={<CreateNetProfit />} />
          <Route path="/customerGrowthCreate/" element={<CreateCustomerGrowth />} />
          <Route path="/customerInfluxCreate/" element={<CreateCustomerInflux />} />

          {/* Financial Editing Routes */}
          <Route path="/inflationEdit/:id" element={<EditInflation />} />
          <Route path="/operatingIncomeEdit/:id" element={<EditOperatingIncome />} />
          <Route path="/expensesEdit/:id" element={<EditExpenses />} />
          <Route path="/netProfitEdit/:id" element={<EditNetProfit />} />
          <Route path="/customerGrowthEdit/:id" element={<EditCustomerGrowth />} />
          <Route path="/customerInfluxEdit/:id" element={<EditCustomerInflux />} />

          {/* Prototyping & Design Routes */}
          <Route path="/wireFrame" element={<WireFrame />} />

          {/* Pitch Deck Routes */}
          <Route path="/pitchDeck" element={<PitchDeck />} />
          <Route path="/pitchDeckStart/" element={<PitchDeckStart />} />
          <Route path="/pitchDeckUpload" element={<PitchDeckUpload />} />
          <Route path="/pitchDeckView" element={<PitchDeckView />} />
          <Route path="/pitchDeckResources" element={<PitchDeckResources />} />
          <Route path="/pitchDeckLectures" element={<PitchDeckLectures />} />
          <Route path="/presentation" element={<Presentation />} />

          {/* Branding Routes */}
          <Route path="/branding" element={<Branding />} />
          <Route path="/brandingUpload" element={<BrandingUpload />} />

          {/* Team Management Routes */}
          <Route path="/teamView/" element={<TeamView />} />
          <Route path="/teamAdd/" element={<TeamAdd />} />

          {/* File Management Routes */}
          <Route path="/upload/" element={<Upload />} />
          <Route path="/AllFiles" element={<AllFiles />} />
          <Route path="/subtypes/:type/:subtype" element={<FilesList />} />
          <Route path="/craddule/" element={<Craddule />} />
          <Route path="/types/:id" element={<CradduleType />} />
          <Route path="/craddule/:hubType" element={<Subfolder />} />
          <Route path="/craddule/:hubType/upload" element={<SubFolderUpload />} />

          {/* Media Management Routes */}
          <Route path="/createVideo/" element={<CreateVideo />} />
          <Route path="/createVideosAdmin/" element={<CreateVideosAdmin />} />
          <Route path="/inspVideo" element={<InspVideo />} />

          {/* Task Management Routes */}
          <Route path="/createTask/" element={<CreateTask />} />
          <Route path="/uploadTask/" element={<UploadTask />} />

          {/* Sharing Routes */}
          <Route path="/share/start/:id/" element={<Share />} />
          <Route path="/sharereview/:id" element={<ShareReview />} />
          <Route path="/shareview/:id/:phase" element={<ShareView />} />
          <Route path="/sharefeedback/:id/:phase" element={<ShareFeedback />} />
          <Route path="/sharePhase/" element={<SharePhase />} />

          {/* Feedback & Communication Routes */}
          <Route path="/feedback" element={<PageFeedback />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/createQuote/" element={<CreateQuote />} />

          {/* Summary & Reports Routes */}
          <Route path="/summary-phase/:phase" element={<PhaseSummary />} />

          {/* Settings Routes */}
          <Route path="/generalSetting" element={<GeneralSetting />} />

          {/* Utility Routes */}
          <Route path="/accelerate/" element={<Accelerate />} />
          <Route path="/createScrap/:id" element={<ScrapCreate />} />
          <Route path="/createScrapName/" element={<ScrapCreateName />} />
          <Route path="/scrapView/" element={<ScrapView />} />

          {/* AI & Testing Routes */}
          <Route path="/test-ai/:phase" element={<QuestionOptions />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;