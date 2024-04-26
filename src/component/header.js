import React, { useState } from 'react';
import p1 from './../images/p1.jpeg';
import p2 from './../images/p2.jpeg';
import p3 from './../images/p3.jpeg';
import p4 from './../images/p4.jpeg';
import p5 from './../images/p5.jpeg';
import p6 from './../images/p6.jpeg';
import { CiBellOn ,CiUser, CiChat2} from 'react-icons/ci';
import ChatToolModal from './chatToolModal';

const Header = () => {
    const [isOpen, setIsOpen]= useState(false);
    return(
        <>
    <div className="headerH">
        <div className='row'>
            <div className='col-md-2'>
                <p className='pName'>The Quest (Project)</p>
                <p className='pSlogan'>Just Do It</p>

            </div>

            <div className='col-md-7'>
                {/* <div class="proTop">
                    <img src={p2} alt="Circular Image" className="circular-image-top"/>
                </div>

                <div class="proTop">
                    <img src={p3} alt="Circular Image" className="circular-image-top"/>
                </div>

                <div class="proTop">
                    <img src={p4} alt="Circular Image" className="circular-image-top"/>
                </div>

                <div class="proTop">
                    <img src={p5} alt="Circular Image" className="circular-image-top"/>
                </div> */}

               

            </div>

            <div className='col-md-3'>
                <div className='fll'>
                    <span className='iconS2 mr'><CiBellOn /></span>
                   <span className='iconS2' type='button' onClick={()=>setIsOpen(true)}><CiChat2 /></span>
                </div>
            </div>
            <ChatToolModal open={isOpen} onClose={() => setIsOpen(false)}>

    </ChatToolModal>
        </div>
       
    </div>
    </>
    )
}

export default Header