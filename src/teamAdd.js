import React, { useState, useEffect, useRef } from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from './config/apiConfig';
import { Toaster, toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faChevronDown, faBold, faItalic, faUnderline, faStrikethrough, faQuoteRight, faCode, faLink, faImage, faTextHeight, faListOl, faListUl, faSubscript, faSuperscript, faOutdent, faIndent, faAlignRight, faHeading } from '@fortawesome/free-solid-svg-icons';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { jwtDecode } from "jwt-decode";
import ImageResize from 'quill-image-resize-vue';
import Tooltip from './component/tooltip';
import ImagePopup from './component/cradduleModal';
import axios from 'axios';
import nspell from 'nspell';
import API_BASE_WEB_URL from './config/apiConfigW';
import HeaderIdeation from './component/headerIdeation';
import SideMenu2P from './component/sideMenu2P';
import BreadCrumb from './component/breadCrumb';
import { FetchUser } from './utils/startUtils';

function getFormattedDate() {
  const date = new Date();

  // Get the day
  const day = date.getDate();

  // Add the appropriate suffix (st, nd, rd, th)
  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
      day % 10 === 2 && day !== 12 ? "nd" :
        day % 10 === 3 && day !== 13 ? "rd" : "th";

  // Get the month name
  const month = date.toLocaleString("default", { month: "long" });

  // Get the year
  const year = date.getFullYear();

  // Return the formatted string
  return `${day}${suffix} ${month} ${year}`;
}

// Example usage
// console.log(getFormattedDate());


function ScrapView({ htmlContent }) {

  const navigate = useNavigate()

  const onClickHandler = () => navigate(`/video`);
  const [images, setImages] = useState([]);
  const [types, setTypes] = useState([]);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [answersV, setAnswersV] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const projectId = localStorage.getItem('nProject');
  const [scrap, setScrap] = useState('');
  const [nda, setNda] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const access_token = localStorage.getItem('access_token');
  console.log(access_token);
  const decodedToken = jwtDecode(access_token);
  const userId = decodedToken.userId;
  console.log(userId);
  const projectName = localStorage.getItem('nProjectName');
  const userName = localStorage.getItem('username');

  const questionType = "BusinessCaseBuilder";
  const questionSubType = "Introduction";
  const [value, setValue] = useState('');
  const [misspelledWords, setMisspelledWords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionBoxPosition, setSuggestionBoxPosition] = useState({ top: 0, left: 0 });
  const [selectedWord, setSelectedWord] = useState(null);
  const [team, setteam] = useState([]);
  const [linkD, setLink] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const handleDelete = (id) => {

    console.log(id);
  };

  const [formData, setFormData] = useState({
    email: '',
    projectId: projectId,
    link: ''
  });

  const handleCheckboxChange = (e) => {
    console.log(e.target.checked);
    setIsChecked(e.target.checked);
  };

  if (access_token) {
    FetchUser(userId, setUserDetails, setError, setLoading);
  }

  console.log(userDetails?.firstName)
  useEffect(() => {
    const getNda = async () => {
      try {
        if (userDetails) {
          const newNdaContent = `
                   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confidentiality and Non-Disclosure Agreement</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }
        .container {
            padding: 20px;
            max-width: 800px;
            margin: auto;
        }
        h1 {
            color: #2E86C1;
            font-size: 24px;
        }
        h2 {
            color: #2874A6;
            font-size: 20px;
            margin-top: 20px;
        }
        p {
            margin: 15px 0;
        }
        .signature {
            margin-top: 40px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT</h1>
        <p>This Confidentiality and Non-disclosure agreement is made this <strong>${getFormattedDate()}</strong></p>

        <h2>PARTIES</h2>
        <p>The Parties to this Agreement are:</p>
        <p><strong>${userDetails?.firstName} with project${projectName}</strong> incorporated under the laws of the Federal Republic of Nigeria with its principal offices at <strong>${projectName}</strong>. Or Your Ideas as contained in this Craddule Project Workspace. (The Disclosing Party).</p>
        <p>And</p>
        <p><strong>${formData.email}</strong> with Craddule account and access to the project. (The Receiving Party/Developer).</p>

        <h2>INTRODUCTION</h2>
        <p>It is hereby agreed as follows:</p>
        <p>The parties are desirous of engaging in discussions for certain purposes (“the Purpose”).</p>
        <p>During the course of their business discussions and transactions, it is anticipated that one party ("the Disclosing Party") may disclose certain confidential and proprietary information related to or in connection with the Parties to the other party ("the Receiving Party"). This disclosure is for the purpose of enabling the Receiving Party to assess, evaluate, provide advice, or fulfill its obligations.</p>
        <p>The Parties recognize that the unauthorized disclosure or use of the Disclosing Party's confidential information by third parties could result in significant harm or prejudice to the Disclosing Party.</p>
        <p>In acknowledgment of the need for confidentiality, the Parties have mutually agreed to enter into this Confidentiality and Non-Disclosure Agreement ("the Agreement").</p>

        <h2>DEFINITIONS AND INTERPRETATION</h2>
        <p>In this Agreement, unless the context otherwise requires:</p>
        <ul>
            <li><strong>“Affiliate”</strong> means, with respect to any person that directly, or indirectly through one or more intermediaries, controls, is controlled by, or is under common control with such person; the term “control” (including the term “controlling”, “controlled by” and “under common control with”) means the possession, direct or indirect, of the power to direct or cause the direction of the management and policies of a person, whether through the ownership of voting securities, by contract, or otherwise.</li>
            <li><strong>"Disclosing Party"</strong> means a Party when it discloses its Confidential Information, directly or indirectly, to the Receiving Party.</li>
            <li><strong>"Confidential Information"</strong> includes, but is not limited to:
                <ul>
                    <li>All information, in any form, disclosed or supplied to a Receiving Party by a Disclosing Party relating to (i) the Purpose, (ii) past, present, or future business partners, joint ventures, or affiliates, or (iii) the Disclosing Party’s, or any of the Disclosing Party’s Representatives’ past, present, or future research, development, or business activities.</li>
                    <li>All business data, Personal Data, technical, financial, operational, administrative, legal, economic, and other information in whatever form (including in written, oral, visual, or electronic form) relating directly or indirectly to the Purpose.</li>
                    <li>All information in whatever form relating to the existence, status, or progress of the Purpose, including the existence and contents of this Agreement and the fact that discussions and negotiations may be taking place in relation to the Purpose.</li>
                    <li>All documents and any other material that contains, reflects, or is generated from any of the foregoing, and all copies of any of the foregoing.</li>
                </ul>
            </li>
            <li><strong>“Personal Data”</strong> means any data which relates to an identified or identifiable person, be it sensitive or non-sensitive data.</li>
            <li><strong>“Representatives”</strong> means, in relation to a Party, its Affiliates and their respective directors, officers, employees, agents, consultants, and advisers.</li>
        </ul>

        <h2>UNDERTAKING</h2>
        <p>The Receiving Party undertakes:</p>
        <ul>
            <li>That all information obtained from the Disclosing Party shall be regarded and treated as confidential and the property of the Disclosing Party.</li>
            <li>To maintain in secrecy any and all Proprietary Information of the Disclosing Party and to act in good faith at all times in performing its obligations under this Agreement.</li>
            <li>Not to disclose the Proprietary Information to any third parties, except where necessary for the performance of obligations under this Agreement.</li>
            <li>To return all Proprietary Information upon termination or expiration of this Agreement.</li>
        </ul>

        <h2>INDEMNITY</h2>
        <p>The Receiving Party indemnifies and holds the Disclosing Party harmless against any loss, expense, claim, harm, damage, or liability of whatsoever nature suffered or sustained by the Disclosing Party resulting from any action, proceeding, or claim made by any person against the Disclosing Party as a result of the breach of this Agreement by the Receiving Party or any of its employees, agents, independent contractors, or consultants.</p>

        <h2>BREACH</h2>
        <p>Should the Receiving Party commit a breach of its obligations in terms of this Agreement, the Disclosing Party has the right to claim actual damages as it may suffer. In addition, the Disclosing Party may apply to Court for an injunction restraining the Receiving Party from using, disclosing, or exploiting the Proprietary Information of the Disclosing Party.</p>

        <h2>DOMICILIUM</h2>
        <p>The Parties respectively choose their respective addresses set forth above as their domicilium citandi et executandi for all purposes of giving any notice, the serving of any process, and for any purpose arising from this Agreement.</p>

        <h2>CONFIDENTIAL INFORMATION USAGE</h2>
        <p>The Developer will hold the Confidential Information in strict confidence and will not disclose, reproduce, reprocess, or distribute any Confidential Information in whole or in part, directly or indirectly, to any persons, other than to its Representatives and with the prior consent of the Company, to the extent that such disclosure, reproduction, or distribution is strictly necessary for the Purpose of this Agreement.</p>

        <h2>CONFIDENTIAL INFORMATION STORAGE</h2>
        <p>The Receiving Party shall store the received/obtained Confidential Information under this Agreement within Nigeria, or the Geographic location of the Disclosing Party.</p>

        <h2>RETURN OR DESTRUCTION OF CONFIDENTIAL INFORMATION</h2>
        <p>Upon termination or expiration of this Agreement, the Developer shall immediately erase/delete all Confidential Information obtained under this Agreement, including operational, archived, and backup Confidential Information.</p>

        <h2>DATA PROTECTION</h2>
        <p>Both parties agree to comply with all applicable data protection laws and regulations concerning the processing of personal data. Each party shall be responsible for ensuring that it has a valid legal basis for processing personal data and obtaining any necessary consents or authorizations as required by law.</p>

        <h2>GENERAL</h2>
        <p>This Agreement contains the entire agreement between the Parties and no variation or consensual cancellation thereof shall be of any force or effect unless reduced to writing and signed by both Parties.</p>

        <div class="signature">
            <p>Signed for and on behalf of</p>
            <p><strong>${projectName}</strong></p>
            <p>____________________</p>
            <p><strong>${userDetails?.firstName + " " + userDetails?.lastName}</strong></p>
            <p><strong>Designation</strong></p>
        </div>

        <div class="signature">
            <p>Developer</p>
            <p>____________________</p>
            <p><strong>${formData.email}</strong></p>
            <p><strong>Designation</strong></p>
        </div>
    </div>
</body>
</html>

                `;

          const createNdaResponse = await fetch(`${API_BASE_URL}/api/nda`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify({
              projectId: projectId,
              nda: newNdaContent
            })
          });

          if (createNdaResponse.status === 200) {
            const createdNda = await createNdaResponse.json();
            // console.log("New NDA created: " + createdNda);
            setNda(createdNda.nda);

          } else {
            console.log('Failed to create NDA');
            setLoading(false);
          }
          if (createNdaResponse.status === 200) {
            const createdNda = await createNdaResponse.json();
            // console.log("New NDA created: " + createdNda);
            setNda(createdNda.nda);

          } else {
            console.log('Failed to create NDA');
            setLoading(false);
          }
        } else {
          // const data = await scrapResponse.json();
          // console.log(data);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getNda();
  }, [projectId, access_token]);

  const createTeam = async (data) => {
    setLoading(true);

    try {
      const timestamp = new Date().getTime();
      const randomString = Math.random().toString(36).substring(2, 8);
      const uniqueCode = timestamp.toString() + randomString;
      const link = "/login/start/" + uniqueCode;

      console.log(link);

      let ndaC = "";

      if (isChecked) {
        ndaC = nda;
        console.log(ndaC);
      }

      const updatedFormData = {
        ...data,
        link: link,
        uniqueCode: uniqueCode,
        projectId: projectId,
        email: data.email,
        nda: ndaC,
      };


      const response = await fetch(API_BASE_URL + '/api/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.status === 200) {
        console.log(updatedFormData)
        setLoading(false);
        console.log(response);
        setLink('https://app.craddule.com' + link);
        toast.success('Invite Sent');
        //setLink(API_BASE_WEB_URL + link);
      } else {
        const result = await response.json();
        setLoading(false);
        console.error('Error:', result['error']);
        toast.error(result['error']);
      }
    } catch (error) {
      setLoading(false);
      console.error('An error occurred:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createTeam(formData);


  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(linkD).then(() => {
      alert('Link copied to clipboard!');
    }).catch((error) => {
      console.error('Failed to copy the link: ', error);
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const scrapResponse = await fetch(API_BASE_URL + `/api/team/${projectId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}` // Include the token in the request headers
          }
        });

        if (scrapResponse.status === 200) {
          // If summary exists, fetch the summary data
          const dataS = await scrapResponse.json();
          console.log(dataS);
          console.log("scrap " + dataS.data.scrap);
          setteam(dataS.data);
        } else {
          const data = await scrapResponse.json();
          console.log(data);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeam();
  }, [projectId]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Get the correct suffix for the day
    const getDaySuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    const dayWithSuffix = day + getDaySuffix(day);

    return `${dayWithSuffix} ${month} ${year}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Get the correct suffix for the day

    return `${time}`;
  };

  const onClickHandler27 = () => navigate(`/createScrapName`);

  const handleN = () => {
    navigate(`/nda`); // Navigate to the view page with the ID as a parameter
  };



  const handleDeleteClick = (id) => {
    deleteTeam(id); // Navigate to the view page with the ID as a parameter
  };

  const deleteTeam = async (id) => {
    try {
      const response = await fetch(API_BASE_URL + `/api/team/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete graph');
      }

      console.log("deleted");
      setteam(team.filter(scrap => scrap._id !== id));

    } catch (error) {
      console.error('Error deleting all graphs:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <>
      <div className=''>
        <div className="">
          <Header />
          <BreadCrumb page={'Add team member'} />
          <div className='w-full max-w-[975px] mx-auto mt-5 px-4 sm:px-6 lg:px-8'>
            <div className='bg-white p-5 rounded-lg shadow-md'>
              <div className="row">
                <div className="mb-4">
                  <h4 className='text-center text-lg sm:text-xl lg:text-2xl font-semibold'>Add Team Member</h4>
                </div>
              </div>

              {linkD && (
                <p className='copyPp text-center'>
                  {linkD}
                  <button className='cop text-blue-500 underline ml-2' onClick={copyToClipboard}>
                    Copy
                  </button>
                </p>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mt-4">
                  <label htmlFor="email" className='text-lg font-medium pb-1 block'>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Enter email'
                    className="w-full border border-gray-400 bg-white px-4 py-3 rounded-lg"
                  />
                </div>

                <div className='text-center mt-4 flex justify-center items-center gap-3'>
                  <input
                    type="checkbox"
                    label="NDA"
                    name="nda"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className='w-5 h-5 border-gray-400 rounded-md'
                  />
                  <span className="text-sm sm:text-base">Send NDA</span>
                </div>

                <div className='mt-4'>
                  <button
                    className="bg-black w-full sm:w-[171px] mx-auto py-2 rounded-lg text-white flex items-center justify-center"
                    type='submit'
                  >
                    {loading && (
                      <FontAwesomeIcon icon={faCircleNotch} className='fa-spin mr-2' />
                    )}
                    <span>{loading ? 'Sending...' : 'Send Invite'}</span>
                  </button>
                </div>
              </form>

              <div className="break mt-6 border-t border-gray-300"></div>
            </div>
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </>
  );

}

export default ScrapView
