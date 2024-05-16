import React from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';



function KPIPage ()  {
    const navigate = useNavigate()
    const onClickHandler = () => navigate(`/trackPage`)

    return (

        <>

        <div className='container-fluid'>
            <Header />
            <div className='row'>
            <Menu /> 
                <div className='col-md-9'>
                    <img src={bci} className='bcA' onClick={onClickHandler}></img>
                    <div className='div-kpi1'><p>KPI</p></div>
                <div className='centerKpi1'>
                <div  className='topButtonKpi'>
                <button className="btn btn-primary tFeem" type="button">Create KPI</button>
                <button className="btn btn-primary tFeem1" type="button">Track KPI</button>
                <button className="btn btn-primary dropdown-toggle tFeem2" type="button" data-toggle="dropdown">Select Project</button>
                </div>

                <div  className='bottomButtonKpi'>
                <button className="btn btn-primary  tFeems" type="button">Add a KPI<br></br><p className='txtc'>Add a KPI manually</p></button>
                <button className="btn btn-primary  tFeems1" type="button">Search for a KPI <br></br><p className='txtc'>Browse and add KPI's from the library</p></button>
                <button className="btn btn-primary  tFeems2" type="button">Add a KPI Template<p className='txtc'>Browse and add KPI's from the library</p></button>
               </div>

                <div class="boxA1">
                    <div className=''>Name</div>
                    <div>Unit</div>
                    <div>Frequency</div>
                    <div>Direction</div>
                    <div>Target</div>
                    <div>Calculated?</div>
                </div>
                <div class="boxA2">
                    <div className=''>Sales Revenue</div>
                    <div>#2,400,000</div>
                    <div>Daily</div>
                    <div className='No'>Up</div>
                    <div className='amt'>#1.200,00</div>
                    <div>No</div>
                    <div className='editT'><a href='' className='anchor'>Edit</a></div>
                    <div className='delete'><a href='' className='anchor1'>Delete</a></div>
                </div>
                <div class="flex-container box3">
                    <div className='list1'></div>
                </div>
                <div class="flex-container box3">
                    <div className='list1'></div>
                </div>
                <div class="flex-container box3">
                    <div className='list1'></div>
                </div>
                </div> 
        
                <button className="btn btn-primary curveNext">Next</button>
          </div>
          </div>
          </div>
          </>
    );
}

export default KPIPage