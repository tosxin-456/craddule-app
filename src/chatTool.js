import React, {useEffect,useState,useRef} from 'react';
import {CiCamera, CiShare1, CiFaceSmile, CiUndo, CiMobile1, CiPaperplane, CiCircleRemove, CiFolderOn} from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import p1 from './images/p1.jpeg';
import wire7 from './images/wire7.jpeg'
import p2 from './images/p2.jpeg';
import p3 from './images/p3.jpeg';
import p4 from './images/p4.jpeg';
import p5 from './images/p5.jpeg';



function ChatTools () {
  return(
  <div className='container-fluid1 chat'>
  <div className='col-md-4'>
  <div className='newMHold'>
  <div className='newMHold3'>
    <div className='chatIcon1'>
      <span className='iconS3'><CiMobile1 /></span>
      <span className='iconS3'><CiUndo /></span>
    </div>
    <div className='chatGrid'>
      <div>
        <p>UI Team</p>
      </div>

      <div >
        <div className='imgChatDiv'>
          <div>
            <img src={p1} className='chatImg'></img>
            <img src={p2} className='chatImg'></img>
            <img src={p3} className='chatImg'></img>
            <img src={p4} className='chatImg'></img>
          </div>
          <div>
            <span className='iconS3'><CiMobile1 /></span>
            <span className='iconS3'><CiCamera /></span>
          </div>
        </div>
      </div>

      <div>
        <div className='iconTxt'>
          <div>
            <span className='iconS3'><CiCircleRemove /></span>
            <p className='iconTxtP'>4 Members</p>
          </div>
          <div>
            <span className='iconS3'><CiFolderOn /></span>
            <p className='iconTxtP'>80 Attachments</p>
          </div>
        </div>
      </div>
    </div>

    <div className='chatTextT1'>
      <p className='chatText1'>Today 12th March, 2024</p>
    </div>

    <div className='chatGrid1'>
      <div className='chatCon'>
      <div className='chatConT'>
      <p>You</p>
        <div>
          <p>What about todays designers</p></div>
        </div>
        <div >
        <img src={p5} className='chatImg3'></img>
        </div>
      </div>
      </div>

    <div>
      <p className='chatText1'>11:26</p>
    </div>

    <div className='chatGrid1'>
      <div className='chatCon1'>
        <img src={p1} className='chatImg4'></img>
        <div className='chatConT1'>
          <p>Angela Onoja</p>
          <div><img src={wire7} className='chatImg1'></img> </div>
        </div>
      </div>
    </div>

    <div>
      <p className='chatText1'>11:29</p>
    </div>

    <div className='chatGrid1' >
      <div className='chatCon1'>
        <img  src={p1} className='chatImg3'></img>
        <div className='chatConT1'>
          <p>You</p>
          <div><p>Here they are, Let's do it</p></div>
        </div>
      </div>
    </div>

    <div>
      <p className='chatText1'>11:30</p>
    </div>

    <div className='chatGrid1'>
      <div>
        <span className='iconS3'><CiShare1 /></span>
        <span className='iconS3'><CiFaceSmile/></span>
        <input placeholder='Write your message'></input>
        <button>Send</button>
      </div>
    </div>
  </div>
  </div>
  </div>
  </div>
  )
}


export default ChatTools;
