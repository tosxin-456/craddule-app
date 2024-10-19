import React, { useState } from 'react';
import SideMenu2 from './component/sideMenu2';
import { useNavigate } from 'react-router-dom';
import home from './images/HOME.png';
import circle from './images/circle.png';
import HeaderIdeation from './component/headerIdeation';

function GoNoGoMain() {
    const navigate = useNavigate();
    const [hoveredBox, setHoveredBox] = useState(null); // Track which box is hovered
    const [status, setStatus] = useState({
        business: 'Not started',
        financial: 'Not started',
        summary: 'Not started'
    }); // Track status of each box

    const handleMouseEnter = (box) => {
        setHoveredBox(box); // Track which box is being hovered
    };

    const handleMouseLeave = () => {
        setHoveredBox(null); // Reset hover state when mouse leaves
    };

    const handleGetStartedClick = (box) => {
        setStatus((prevStatus) => ({
            ...prevStatus,
            [box]: 'Ongoing' // Update status to 'Ongoing' on button click
        }));
    };

    return (
        <div
            style={{
                fontFamily: '"Manrope", sans-serif'
            }}
            className='container2'>
            <SideMenu2 />
            <div className="main-content">
                <HeaderIdeation />

                <div className='container relative'>
                    <div className="absolute inset-0 mt-[80px] ml-[60px] z-[-100] bg-no-repeat bg-cover w-[200px] h-[200px]" style={{ backgroundImage: `url(${circle})` }}></div>
                    <div className="main-content2">
                        <div className='w-fit ml-auto'>
                            <div>
                                <img src={home} />
                            </div>
                        </div>
                        <div className='bacWHI mt-[20px]'>
                            <div className='m-auto'>
                                <p className='text-center font-bold text-[17px]'>Go No Go Gate</p>
                                <p className='text-center text-[#8A8A8A] font-semibold text-[15px]'>View</p>
                            </div>

                            {/* Top two containers */}
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 w-full lg:w-[70%] m-auto'>
                                {/* Business Case Builder */}
                                <div
                                    className={`bg-[${status.business === 'Ongoing' ? '#E8C400' : '#8A8A8A'}] rounded-tr-3xl rounded-bl-3xl p-4 text-white text-center transition-all ${hoveredBox === 'business' && status.business !== 'Ongoing' ? 'bg-[#8A8A8A]' : ''}`}
                                    onMouseEnter={() => handleMouseEnter('business')}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {/* Dynamically change content on hover */}
                                    <p className='font-bold text-[15px]'>
                                        {hoveredBox === 'business' && status.business !== 'Ongoing' ? 'Select Actions' : 'Business Case Builder'}
                                    </p>
                                    <div className='p-[15px] min-h-[60px]'> {/* Set consistent height */}
                                        <p>{hoveredBox === 'business' && status.business !== 'Ongoing' ? 'Let\'s begin with this phase' : status.business}</p>
                                    </div>
                                    {hoveredBox === 'business' && status.business !== 'Ongoing' && (
                                        <button
                                            className='mt-2 text-black bg-[#B0B0B0] w-4/5 px-4 py-2 rounded-full'
                                            onClick={() => handleGetStartedClick('business')}
                                        >
                                            Begin
                                        </button>
                                    )}
                                </div>

                                {/* Custom Financial Projection */}
                                <div
                                    className={`bg-[${status.financial === 'Ongoing' ? '#E8C400' : '#8A8A8A'}] rounded-tr-3xl rounded-bl-3xl p-4 text-white text-center transition-all ${hoveredBox === 'financial' && status.financial !== 'Ongoing' ? 'bg-[#8A8A8A]' : ''}`}
                                    onMouseEnter={() => handleMouseEnter('financial')}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <p className='font-bold text-[15px]'>
                                        {hoveredBox === 'financial' && status.financial !== 'Ongoing' ? 'Select Actions' : 'Custom Financial Projection'}
                                    </p>
                                    <div className='p-[15px] min-h-[60px]'> {/* Set consistent height */}
                                        <p>{hoveredBox === 'financial' && status.financial !== 'Ongoing' ? 'Let\'s begin with this phase' : status.financial}</p>
                                    </div>
                                    {hoveredBox === 'financial' && status.financial !== 'Ongoing' && (
                                        <button
                                            className='mt-2 text-black bg-[#B0B0B0] w-4/5 px-4 py-2 rounded-full'
                                            onClick={() => handleGetStartedClick('financial')}
                                        >
                                            Begin
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Go No Go container */}
                            <div className='flex justify-center mt-[20px]'>
                                <div
                                    className={`bg-[${status.summary === 'Ongoing' ? '#E8C400' : '#8A8A8A'}] rounded-tr-3xl rounded-bl-3xl p-4 text-white text-center w-full lg:w-[35%] transition-all ${hoveredBox === 'summary' && status.summary !== 'Ongoing' ? 'bg-[#8A8A8A]' : ''}`}
                                    onMouseEnter={() => handleMouseEnter('summary')}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <p className='font-bold text-[15px]'>
                                        {hoveredBox === 'summary' && status.summary !== 'Ongoing' ? 'Select Actions' : 'Summary pdf'}
                                    </p>
                                    <div className='p-[15px] min-h-[60px]'> {/* Set consistent height */}
                                        <p>{hoveredBox === 'summary' && status.summary !== 'Ongoing' ? 'Let\'s begin with this phase' : status.summary}</p>
                                    </div>
                                    {hoveredBox === 'summary' && status.summary !== 'Ongoing' && (
                                        <button
                                            className='mt-2 text-black bg-[#B0B0B0] w-4/5 px-4 py-2 rounded-full'
                                            onClick={() => handleGetStartedClick('summary')}
                                        >
                                            Begin
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* End Phase Button Centered */}
                            <div className='flex justify-center mt-[20px]'>
                                <button className='bg-[#E8C400] p-[10px] pr-[10px] w-[20rem] rounded-full'>
                                    End Phase
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GoNoGoMain;
