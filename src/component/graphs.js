import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config/apiConfig';
import { FaChevronDown, FaChevronUp, FaLock, FaToolbox } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import GetCard from '../getCard';

function PhasePercentage() {
    const [phaseData, setPhaseData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedPhase, setExpandedPhase] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    const [showContent, setShowContent] = useState(false); // New state for overall visibility

    const navigate = useNavigate();

    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                const access_token = localStorage.getItem('access_token');
                const decodedToken = jwtDecode(access_token);
                const userId = decodedToken.userId;
                const projectId = localStorage.getItem('nProject');

                if (!userId || !projectId) {
                    throw new Error("Missing user ID or project ID");
                }

                const response = await fetch(`${API_BASE_URL}/api/user/graph-data/${userId}/${projectId}`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch phase data");
                }

                const result = await response.json();
                setPhaseData(result.data.phasePercentages);
            } catch (err) {
                console.error("Error fetching phase data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGraphData();
    }, []);

    const togglePhase = (phaseId) => {
        if (expandedPhase === phaseId) {
            setExpandedPhase(null);
        } else {
            setExpandedPhase(phaseId);
        }
    };

    const toggleContent = () => {
        setShowContent(!showContent);
    };

    const subscriptionFunction = () => {
        setShowPayment(false);
        setTimeout(() => {
            setShowPayment(true);
        }, 50);
    };

    const formatLabel = (url) => {
        if (url === "/customFinancial") return "Custom Financial Projection";
        if (url === "/branding") return "Branding";
        if (url.startsWith("/go/")) return "Go No Go";
        return url.replace("/go/", "").replace("/", "").toUpperCase();
    };

    const phaseUrls = {
        Ideation: ["/go/Ideation"],
        ProductDefinition: ["/customFinancial", "/branding", "/go/ProductDefinition"],
        InitialDesign: ["/go/InitialDesign"],
        ValidatingAndTesting: ["/go/ValidatingAndTesting"],
        Commercialization: ["/go/Commercialization"],
    };

    const isPhaseAccessible = (phaseName) => {
        const subscribed = localStorage.getItem('subscribed') === 'true';
        if (subscribed) {
            return true;
        }
        return phaseName === 'Ideation';
    };

    // Phase configuration with colors
    const phases = [
        { id: "Ideation", title: "Ideation", color: "bg-blue-800", borderColor: "border-blue-800", textColor: "text-blue-800" },
        { id: "ProductDefinition", title: "Product Definition", color: "bg-blue-800", borderColor: "border-blue-800", textColor: "text-blue-800" },
        { id: "InitialDesign", title: "Initial Design", color: "bg-blue-800", borderColor: "border-blue-800", textColor: "text-blue-800" },
        { id: "ValidatingAndTesting", title: "Validating & Testing", color: "bg-blue-800", borderColor: "border-blue-800", textColor: "text-blue-800" },
        { id: "Commercialization", title: "Commercialization", color: "bg-blue-800", borderColor: "border-blue-800", textColor: "text-blue-800" }
    ];

    // Function to safely display percentages
    const displayPercentage = (value) => {
        if (value === null || value === undefined || isNaN(value)) return 0;
        return Math.round(value); // Round to ensure whole numbers
    };

    // Function to determine status color
    const getStatusColor = (percentage, accessible) => {
        if (!accessible) return "bg-gray-400"; // Locked
        if (percentage >= 100) return "bg-green-500"; // Completed
        if (percentage > 0) return "bg-yellow-500"; // In Progress
        return "bg-blue-200"; // Not started but accessible
    };

    // Function to determine stroke color for SVG circle
    const getStrokeColor = (percentage, accessible) => {
        if (!accessible) return "stroke-gray-400"; // Locked
        if (percentage >= 100) return "stroke-green-500"; // Completed
        if (percentage > 0) return "stroke-yellow-500"; // In Progress
        return "stroke-blue-200"; // Not started but accessible
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl m-10 mx-auto px-2">
            {/* Toolbox Header Bar */}
            <div className="flex justify-between items-center mb-3 p-2 bg-blue-800 text-white rounded-lg shadow-md">
                <p className="text-lg font-semibold">Project Phases</p>
                <button
                    onClick={toggleContent}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-700 hover:bg-blue-900 rounded-md transition-colors duration-200"
                >
                    <FaToolbox className="mr-2" />
                    {showContent ? 'Close' : 'Open'} Tools
                    {showContent ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
                </button>
            </div>

            {/* Collapsible Content */}
            <div className={`transition-all duration-300 ease-in-out ${showContent ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                    {phases.map((phase) => {
                        // Get percentage value, default to 0 if not found
                        const rawPercentage = phaseData[phase.id] || 0;
                        const percentage = displayPercentage(rawPercentage);
                        const isExpanded = expandedPhase === phase.id;
                        const accessible = isPhaseAccessible(phase.id);
                        const urls = phaseUrls[phase.id] || [];
                        const statusColor = getStatusColor(percentage, accessible);
                        const strokeColor = getStrokeColor(percentage, accessible);

                        // Calculate stroke-dasharray value for SVG circle
                        const circumference = 2 * Math.PI * 20;
                        const dash = Math.min(percentage / 100, 1) * circumference;
                        const strokeDasharray = `${dash} ${circumference}`;

                        return (
                            <div
                                key={phase.id}
                                className={`rounded-lg shadow-md overflow-hidden border ${accessible ? 'border-gray-200' : 'border-gray-300'} 
                                        ${!accessible ? 'bg-gray-50' : 'bg-white'}`}
                            >
                                {/* Phase header with percentage */}
                                <button
                                    onClick={() => togglePhase(phase.id)}
                                    className={`w-full px-3 py-3 flex items-center justify-between transition-all duration-200
                                            ${accessible ? 'hover:bg-gray-50' : 'cursor-default'}`}
                                    aria-expanded={isExpanded}
                                    disabled={!accessible && urls.length === 0}
                                >
                                    <div className="flex items-center space-x-3">

                                        {/* Circular progress indicator */}
                                        <div className="relative">
                                            <svg className="w-10 h-10" viewBox="0 0 48 48">
                                                {/* Background circle */}
                                                <circle
                                                    cx="24"
                                                    cy="24"
                                                    r="20"
                                                    fill="none"
                                                    strokeWidth="4"
                                                    className="stroke-gray-200"
                                                />
                                                {/* Progress circle */}
                                                <circle
                                                    cx="24"
                                                    cy="24"
                                                    r="20"
                                                    fill="none"
                                                    strokeWidth="4"
                                                    className={strokeColor}
                                                    strokeDasharray={strokeDasharray}
                                                    strokeDashoffset="0"
                                                    transform="rotate(-90 24 24)"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            {/* Percentage text in center */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className={`text-xs font-semibold ${accessible ? 'text-gray-800' : 'text-gray-500'}`}>
                                                    {percentage}%
                                                </span>
                                            </div>
                                        </div>

                                        <div className="truncate">
                                            <p className={`font-semibold ${accessible ? phase.textColor : 'text-gray-500'} text-sm`}>
                                                {phase.title}
                                                {!accessible && (
                                                    <span className="inline-flex items-center ml-2">
                                                        <FaLock className="text-gray-400 text-xs" />
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Expand/collapse indicator - only show if there are tools */}
                                    {urls.length > 0 && (
                                        <div className="flex items-center">
                                            <span className={`text-xs ${accessible ? 'text-gray-500' : 'text-gray-400'} mr-1`}>Tools</span>
                                            {isExpanded ?
                                                <FaChevronUp className={`text-xs ${accessible ? 'text-gray-500' : 'text-gray-400'}`} /> :
                                                <FaChevronDown className={`text-xs ${accessible ? 'text-gray-500' : 'text-gray-400'}`} />
                                            }
                                        </div>
                                    )}
                                </button>

                                {/* Phase tools (expandable) - only shown if there are tools */}
                                {urls.length > 0 && (
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden border-t 
                                                ${isExpanded ? 'max-h-screen opacity-100 border-gray-200' : 'max-h-0 opacity-0 border-transparent'}`}
                                    >
                                        <div className="p-3">
                                            <div className="flex flex-wrap gap-2">
                                                {urls.map((url, urlIndex) => (
                                                    <button
                                                        key={`${phase.id}-${urlIndex}`}
                                                        onClick={() => accessible ? navigate(url) : subscriptionFunction()}
                                                        className={`px-2 py-1 text-white rounded-md transition text-xs flex items-center gap-1
                                                            ${!accessible
                                                                ? 'bg-gray-400 hover:bg-gray-500 cursor-pointer'
                                                                : 'bg-blue-800 hover:bg-blue-900'
                                                            } focus:outline-none focus:ring-1 focus:ring-offset-1 ${accessible
                                                                ? 'focus:ring-blue-600'
                                                                : 'focus:ring-gray-300'
                                                            }`}
                                                        title={!accessible ? "Requires subscription" : formatLabel(url)}
                                                    >
                                                        <span>{formatLabel(url)}</span>
                                                        {!accessible && (
                                                            <FaLock className="text-white text-xs ml-1" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex justify-center items-center gap-4 md:gap-8 mt-6 flex-wrap">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        <span className="text-xs text-gray-600">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                        <span className="text-xs text-gray-600">In Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-200"></div>
                        <span className="text-xs text-gray-600">Not Started</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                        <span className="text-xs text-gray-600">Locked</span>
                    </div>
                </div>
            </div>

            {/* Collapsed View */}
            {!showContent && (
                <div className="p-4 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
                    <p>Tools are currently hidden. Click "Open Tools" to show them.</p>
                </div>
            )}

            {/* Subscription modal would go here */}
            {showPayment && (
                <GetCard />
            )}
        </div>
    );
}

export default PhasePercentage;