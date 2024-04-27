import React, {useEffect} from 'react';
import bci from './images/bc.png'; 
import bob from './images/bob.png'; 
import Header from './component/header';
import Menu from './component/menu';

import WOW from 'wowjs';
import 'animate.css/animate.css'; // Import Animate.css
import 'wowjs/css/libs/animate.css';

function GoPage ()  {
    useEffect(() => {
        const wow = new WOW.WOW();
        wow.init();
      }, []);

    return (
       <>
       
       <div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu />       
       
       <div className='col-md-9'>
            <div className='centerC'>

            <div className='text-center'>
                <p className='centerH pa wow fadeInLeft'>Go/ No-Go Gate</p>
               
            </div>

                <div className='columns rowU'>
                    {/* <div className='columnG gogo wow fadeInUp'>
                        <p className='goP'>Phase 1</p>
                        <p className='goP2'>Business Case Builder</p>

                        <div className='goH'>
                            <h1 className='goTitle'> Select Action</h1>
                            <h1 className='goSub'>This Phase as been accomplished, you can still go back to see what was done</h1>
                            <span className='goBtnP'>Revisit</span>
                        </div>
                    </div> */}


                    <div className='columnG gogo wow fadeInUp'>
                        <p className='goP'>Phase 1</p>
                        <p className='goP2'>Business Case Builder</p>

                        <div className='goH'>
                            <h1 className='goTitle'> Select Action</h1>
                            <h1 className='goSub'>You will have to accept or deny that this phase meets the require standard</h1>
                            <span className='goBtnP'>Accept</span>
                            <span className='goBtnPD'>Deny</span>
                        </div>
                    </div>


                    <div className='columnG gogoG wow fadeInUp'>
                        <p className='goP'>Phase 2</p>
                        <p className='goP2'>Custom Financial Projection</p>

                        <div className='goH'>
                            <h1 className='goTitle'>No Action</h1>
                            <h1 className='goSub'>Can only Movge forward when you have passed previous stages</h1>
                           
                        </div>
                    </div>

                    <div className='columnG gogoG wow fadeInDown'>
                        <p className='goP'>Phase 3</p>
                        <p className='goP2'>Discounted Cash Flow</p>

                        <div className='goH'>
                            <h1 className='goTitle'>No Action</h1>
                            <h1 className='goSub'>Can only Movge forward when you have passed previous stages</h1>
                            
                        </div>
                    </div>

                    <div className='columnG gogoG wow fadeInDown'>
                        <p className='goP'>Phase 4</p>
                        <p className='goP2'>Comparable Companies</p>

                        <div className='goH'>
                            <h1 className='goTitle'>No Action</h1>
                            <h1 className='goSub'>Can only Movge forward when you have passed previous stages</h1>
                            
                        </div>
                    </div>

                    
                    
                </div>
            </div>

           


        </div>
        </div>
        </div>
        </>
    );
}

export default GoPage
