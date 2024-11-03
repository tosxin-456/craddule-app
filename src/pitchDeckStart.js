import React, { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from './config/apiConfig';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideMenu2P from './component/sideMenu2P';
import ReferralModal from './component/randomPopUp';
import Header from './component/header';
import circle from './images/circle.png';
import home from './images/HOME.png';
import viewPitchDeck from './images/pitch_deck yellow1.jpg'
import upload from './images/upload_file.png'
import resources from './images/resources.png'
import lectures from './images/lectures.png'
import feedback from './images/feedback.svg';

const PitchDeck = () => {
  const navigate = useNavigate()

  const projectId = localStorage.getItem('nProject');
  const prototypeType = localStorage.getItem('selectedPrototype');

  const access_token = localStorage.getItem('access_token');
  const decodedToken = jwtDecode(access_token);
  const userId = decodedToken.userId;

  const handleClickUp = () => {
    navigate('/pitchDeckUpload');
  };

  const handleClickVi = () => {
    navigate('/pitchDeckView');
  };

  const handleClickP = () => {
    navigate('/pitchDeckResources');
  };

  const handleClickL = () => {
    navigate('/pitchDeckLectures');
  };

  return (
    <>
      <Header />
      <div className='container relative'>
        <div className="absolute inset-0 mt-[60px] ml-[-20px] z-[-100] bg-no-repeat bg-cover w-[200px] h-[200px]" style={{ backgroundImage: `url(${circle})` }}></div>
        <div className=" mr-auto">
          <div className="flex  justify-between items-center w-[100%]">
            <div className="w-fit">
              <button onClick={() => navigate(-1)} className='bg-[#193FAE] px-[30px] py-[5px] text-white rounded-3xl'>
                Back
              </button>
            </div>
            <div>
              <img src={home} alt="Home Icon" />
            </div>
          </div>
        </div>
        <div className='coverPit'>
          <div className='row'>
            <div className='col-md-6'>
              <p className='ppit'>Pitch Deck</p>
              <p className='ppit2'>A pitch deck is a concise presentation used to communicate your business plan, product, vision, and growth potential to investors or stakeholders. It highlights key aspects of your company, including the market opportunity, solution, business model, financial projections, and team. The goal is to persuade investors to support your venture by showcasing your value proposition and strategic approach.</p>
            </div>

            <div className='col-md-6'>
              <div className='row'>

                <div className='col-md-6'>
                  <div className='caseBAVieSyart ' onClick={handleClickVi}>
                    <p className='conCa'>View PitchDeck</p>
                    <p className='conCa2'>View previously Uploaded Files for Pitch deck</p>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div
                    className="caseBAVieUpload"
                    onClick={handleClickUp}
                  >
                    <p className="conCa">Upload File</p>
                    <p className="conCa2">Upload pitch deck files for view later on</p>
                  </div>

                </div>

                <div className='col-md-6'>
                  <div
                    className="caseBAVie"
                    onClick={handleClickP}
                  >
                    <p className="conCa">Resources</p>
                    <p className="conCa2">View Resources to help</p>
                  </div>

                </div>

                <div className='col-md-6'>
                  <div className='caseBAVieSyartLecture' onClick={handleClickL}>
                    <p className='conCa'>Pitch Deck Lectures</p>
                    <p className='conCa2'>Watch videos on Pitchdeck's and the things needed</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div
          className="fixed bottom-0 right-0 z-[-100] m-0 p-0 w-[250px] h-[250px] bg-no-repeat"
          style={{
            backgroundImage: `url(${feedback})`,
            backgroundSize: '100% 100%', // Stretches image to fit exactly
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            margin: '0',
            padding: '0',
          }}
        ></div>



      </div>
    </>
  );
};

export default PitchDeck
