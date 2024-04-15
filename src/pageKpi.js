import React from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';



function PageKpi ()  {
    const navigate = useNavigate()

     const onClickHandler = () => navigate(`/introduction1`)
    return (

        <>

        <div className='container-fluid'>
            <Header />
            <div className='row'>
            <Menu /> 
                <div className='col-md-9'>
                    <img src={bci} className='bcA'></img>
                       <div className='div-kpi'>KPI</div>
                <div className='centerKpi'>
                <button className="btn btn-primary teamF" type="button">Create KPI</button>
                <button className="btn btn-primary team" type="button">Track KPI</button>
                <button className="btn btn-primary dropdown-toggle teamL" type="button" data-toggle="dropdown">Select Project</button>
                <br></br>
                <button className="btn btn-primary  teamS" type="button">Add a KPI<br></br><p className='txtc'>Add a KPI manually</p></button>
                <button className="btn btn-primary  team1" type="button">Search for a KPI <br></br><p className='txtc'>Browse and add KPI's from the library</p></button>
                <button className="btn btn-primary  teamk" type="button">Add a KPI Template<p className='txtc'>Browse and add KPI's from the library</p></button>
                <br></br>
                <div class="flex-container box1">
                    <div className='list'>Name</div>
                    <div>Unit</div>
                    <div>Frequency</div>
                    <div>Direction</div>
                    <div>Target</div>
                    <div>Calculated?</div>
                </div>
                <div class="flex-container box2">
                    <div className='list1'>Sales Revenue</div>
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

export default PageKpi