import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { text } from '@fortawesome/fontawesome-svg-core';
import { Toaster, toast } from 'sonner';
import { jwtDecode } from "jwt-decode";
import logobg from './images/logobg.png'; 
import ModalStart from './component/modalStart';
import {API_BASE_URL} from './config/apiConfig';

function CreateProject() {


  const [isOpen, setIsOpen]= useState(true);
  

    const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;








  return (
    <div>
      <div className='createPG'>
        <img src={logobg} className='createPI'></img>
      </div>

      <ModalStart open={isOpen} onClose={() => setIsOpen(true)}>

      </ModalStart>
    </div>
  );
}

export default CreateProject;
