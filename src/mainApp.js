import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './component/header';
import Menu from './component/menu';
import MarketAnalysis from './marketAnalysis';
import Introduction from './introduction';
import ExecutiveSummary from './ExecutiveSummary';
import IntroductionTwo from './introduction1';
import ExecutiveSummarys from './executiveSummarys';
import SectionIntro from './sectionIntro';
import ProblemStatement from './problemstatement';
import VideoDemo from './video';
import FinancialP from './financialP';
import CashFlow from './Sectiondcf';
import Sectiondcf from './Sectiondcf';
import SectiondcfTwo from './SectiondcfTwo';
import Sectiondcf3 from './SectionDiscount';
import Solution from './Solution';
import RiskMitigation from './mitigation';
import Financials from './Financials';
import Implementation from './implementation';
import Conclusion from './conclusion';
import PageGovernance from './govPage';
import PageCost from './costPage';
import PageBenefit from './pageBenefit';







function App() {

    //useEffect(() => {
    //     const wow = new WOW.WOW();
    //     wow.init();
    //   }, []);
    
    

  return (

   <div>
    <Header />
    <Menu />       
    {/*<MarketAnalysis/>*/}
    {/*<Introduction />*/}
    {/*<SectionIntro />*/}
    {/*<ExecutiveSummary />*/}
    {/*<IntroductionTwo />*/}
    {/*<ExecutiveSummarys />*/}
    {/*<ProblemStatement/>*/}
    {/*<VideoDemo />*/}
    {/*<FinancialP />*/}
    {/*Sectiondcf />*/}
    {/*<SectiondcfTwo />*/}
    {/*<Sectiondcf3 />*/}
    {/*<Solution />*/}
    {/*<RiskMitigation />*/}
    <Financials />
    {/*<Implementation />*/}
    {/*<Conclusion />*/}
    {/*<PageGovernance/>*/}
    {/*<PageCost />*/}
    {/*<PageBenefit />*/}
  
  


    
    

   {/* <div className='col-md-10'>
        <div className='centerC'>
            <img src={bci} className='bcI'></img>

            <div className='text-center'>
                <p className='centerH'>Executive Summary</p>
                <p className='centerHp'>Make sure you answer all questions</p>
                <img src={bro} className='bro'></img>
               
            </div>
            <p className='question'>Why do you want to start a Company</p>
            <div className='container-textAs'>
                <textarea className='textAs'></textarea>
            </div>
            <p className='suggest'>Your answer shouldn’t be about money, It should be about solving a problem</p>
        </div> 

        <button className="btn btn-primary curveNext">Next</button>
  </div>    */}



</div>

  );
}

export default App;
