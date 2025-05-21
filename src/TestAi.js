import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "./config/apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
    FaRedo,
    FaCheck,
    FaEyeSlash,
    FaEye,
    FaArrowRight,
    FaArrowLeft,
    FaHome,
    FaTimesCircle,
    FaTools
} from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import home from './images/HOME.png';
import Header from "./component/header";
import circle from './images/circle.png';
import feedback from './images/feedback.svg';
import GetCard from "./getCard";
import CarStepsProcess from "./component/carsComponents";

export default function QuestionOptions() {
    // State management
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [regenerating, setRegenerating] = useState(false);
    const [phaseComplete, setPhaseComplete] = useState(false);
    const [twoLine, setTwoLine] = useState("");
    const [boxes, setBoxes] = useState([]);
    const [selectedBox, setSelectedBox] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [nextPhase, setNextPhase] = useState("");
    const [showPayment, setShowPayment] = useState(false);

    // Local storage and params
    const projectId = localStorage.getItem("nProject");
    const token = localStorage.getItem("access_token");
    const decodedToken = token ? jwtDecode(token) : { userId: "" };
    const userId = decodedToken.userId;
    const { phase } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        requestAnimationFrame(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
    }, []);

    // Get subscription status from localStorage
    const subscribed = localStorage.getItem('subscribed') === 'true';

    // Constants
    const phasePaths = [
        "Ideation",
        "ProductDefinition",
        "InitialDesign",
        "ValidatingAndTesting",
        "Commercialization"
    ];

    const phaseUrls = {
        Ideation: ["/go/Ideation"],
        ProductDefinition: ["/customFinancial", "/branding", "/go/ProductDefinition"],
        InitialDesign: ["/go/InitialDesign"],
        ValidatingAndTesting: ["/go/ValidatingAndTesting"],
        Commercialization: ["/go/Commercialization"],
    };

    // Helper functions
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    // Your formatPhase function stays the same
    const formatPhase = (text) => {
        const sentences = text.split(/(?<=[.!?])\s+/);
        const formattedText = sentences
            .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1))
            .join(" ");
        return formattedText;
    }



    const formatLabel = (url) => {
        if (url === "/customFinancial") return "Custom Financial Projection";
        if (url === "/branding") return "Branding";
        if (url.startsWith("/go/")) return "Go No Go";
        return url.replace("/go/", "").replace("/", "").toUpperCase();
    };
    const formatPhaseName = (phase) => {
        return phase.replace(/([a-z])([A-Z])/g, '$1 $2');
    };

    // Computed properties
    const formattedPhase = formatPhaseName(phase);
    const urls = phaseUrls[phase] || [];

    // Correct way to get the third sentence
    const thirdSentence = (() => {
        const sentences = twoLine.split(/(?<=[.!?])\s+/); // Split on punctuation followed by space
        if (sentences.length > 3) {
            return sentences[3]; // If more than 3, get the fourth sentence (index 3)
        } else {
            return sentences[2] || ''; // If only 3 or less, get the third (index 2)
        }
    })();

    console.log(thirdSentence);




    const shouldShowEstimatePrompt = questions[currentIndex]?.question && (
        questions[currentIndex]?.question.includes("estimated cost to serve one user") ||
        questions[currentIndex]?.question.includes("how many users do you project")
    );
    const progress = questions.length > 0 ? Math.round((currentIndex / questions.length) * 100) : 0;

    // API calls
    const fetchTask = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/timeline/projects/${projectId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                setBoxes(data);
            } else {
                const result = await response.json();
                console.error('Error:', result['error']);
            }
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/test-new/questions/${phase}/${projectId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();

            if (data.data?.length > 0) {
                setQuestions(data.data);
                setCurrentIndex(0);
            } else {
                setPhaseComplete(true);
                await fetchTwoLine(); // fire and forget
                await fetchSummaries();
            }

            // fetchSummaries();

            fetchTask(); // fire and forget
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
        setLoading(false);
    };


    const fetchSummaries = async () => {
        setLoading(true);
        const startTime = Date.now();

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/test-new/questions/summary/${phase}/${projectId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (data.status === 200) {
                console.log(data);

            }
        } catch (error) {
            console.error("Error fetching summaries:", error);
        }

        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, 1500 - elapsed);

        setTimeout(() => {
            setLoading(false);
        }, delay);
    };

    const regenerateOptions = async (questionId) => {
        setRegenerating(true);
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/test-new/questions/generate/${questionId}/${projectId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            if (data.data) {
                setQuestions((prev) =>
                    prev.map((q) =>
                        q._id === questionId
                            ? { ...q, options: data.data.options, optionsCount: data.data.count }
                            : q
                    )
                );
            }
        } catch (error) {
            console.error("Error regenerating options:", error);
        }
        setRegenerating(false);
    };

    const handleSubmit = async () => {
        if (!selectedAnswer.trim()) {
            alert("Please select or type an answer.");
            return;
        }

        setSubmitting(true);
        const currentQuestion = questions[currentIndex];

        try {
            const response = await fetch(`${API_BASE_URL}/api/test-answer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    data: {
                        userId,
                        questionId: currentQuestion._id,
                        phase,
                        projectId,
                        answer: selectedAnswer,
                    },
                }),
            });

            const data = await response.json();
            if (data.status === 200) {
                console.log("Answer submitted successfully:", data);
                setSelectedAnswer("");
                if (currentIndex + 1 < questions.length) {
                    setCurrentIndex((prevIndex) => prevIndex + 1);
                } else {
                    setPhaseComplete(true);
                    fetchTwoLine();
                }
            }
        } catch (error) {
            console.error("Error submitting answer:", error);
        }

        setSubmitting(false);
    };

    const fetchTwoLine = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/two/summary/${phase}/${projectId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            if (data.status === 200) {
                setTwoLine(data.data);
            }
        } catch (error) {
            console.error("Error fetching summaries:", error);
        }
        setLoading(false);
    };

    const getNextPhase = () => {
        const currentIndex = phasePaths.indexOf(phase);
        if (currentIndex === -1 || currentIndex >= phasePaths.length - 1) return;

        const nextPhase = phasePaths[currentIndex + 1];
        navigate(`/test-ai/${nextPhase}`);
    };

    const handleSubscriptionClick = () => {
        if (subscribed) {
            getNextPhase();
        } else {
            setShowPayment(true);
            alert("Please subscribe to see the next phase.");
        }
    };

    // Effects
    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        const currentIndex = phasePaths.indexOf(phase);
        if (currentIndex === -1 || currentIndex >= phasePaths.length - 1) return;

        const nextPickPhase = phasePaths[currentIndex + 1];
        setNextPhase(formatPhase(nextPickPhase));
    }, [phase]);

    useEffect(() => {
        if (formattedPhase === "Ideation") {
            fetchTwoLine();
        }
    }, [formattedPhase]);

    useEffect(() => {
        if (!subscribed && phase !== "Ideation") {
            navigate("/test-ai/Ideation", { replace: true });
        }
    }, [phase, navigate]);

    return (
        <div className="font-sans min-h-screen bg-gray-50">
            <Header />
            <div className="container mx-auto relative px-4 md:px-6">
                {/* Background Elements */}
                <div className="absolute inset-0 mt-[50px] ml-[60px] z-[-100] bg-no-repeat bg-cover w-[200px] h-[200px]"
                    style={{ backgroundImage: `url(${circle})` }}>
                </div>

                <div className="fixed bottom-0 right-0 z-[-100] m-0 p-0 w-[250px] h-[250px] bg-no-repeat"
                    style={{
                        backgroundImage: `url(${feedback})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                    }}>
                </div>

                {/* Payment Modal */}
                {showPayment && <GetCard />}

                {/* Top Navigation */}
                <div className="flex items-center justify-between gap-5 py-4 border-b border-gray-200">
                    <button
                        className="bg-[#193FAE] px-4 md:px-6 py-2 gap-2 text-white rounded-3xl shadow-md hover:bg-[#162E8D] flex items-center transition"
                        onClick={() => navigate('/start')}
                    >
                        <FaArrowLeft size={12} />
                        <span>Phases</span>
                    </button>

                    <p className="text-center font-bold text-xl md:text-xl">
                        {formattedPhase} Phase
                    </p>

                    <div className="w-[100px] flex justify-end">
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 transition"
                            onClick={() => navigate('/start')}
                            aria-label="Home"
                        >
                            <FaHome size={20} className="text-blue-600" />
                        </button>
                    </div>
                </div>

                {/* Phase Navigation Options */}
                <div className="flex flex-col items-center gap-4 py-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleVisibility}
                            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                            aria-label={isVisible ? "Hide tools" : "Show tools"}
                        >
                            {isVisible ?
                                <FaTimesCircle className="w-5 h-5 text-gray-700" /> :
                                <FaTools className="w-5 h-5 text-gray-700" />
                            }
                        </button>

                        {isVisible && (
                            <div className="flex flex-wrap gap-3 justify-center">
                                {urls.map((url, index) => (
                                    <button
                                        key={index}
                                        onClick={() => navigate(url)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
                                    >
                                        {formatLabel(url)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="min-h-[70vh] bg-white bg-[url('./images/pattern_landscape.png')] bg-cover bg-no-repeat rounded-lg shadow-sm">
                    <div className="flex flex-col items-center gap-4 p-6 min-h-screen max-w-4xl mx-auto">
                        {phaseComplete ? (
                            // Completion Message
                            <div className="text-center bg-white shadow-lg p-8 rounded-lg w-full max-w-lg border border-gray-100">
                                <div className="text-2xl md:text-3xl font-bold text-green-600 mb-6">
                                    🎉 <br /> Congratulations! <br /> 🎉
                                </div>

                                <p className="text-lg mb-6">
                                    You have successfully completed the <strong>{formattedPhase}</strong> phase.
                                </p>

                                {formattedPhase === "Ideation" && (
                                    <div
                                        className="text-base font-semibold p-5 my-6 text-gray-700 bg-gray-50 rounded-lg space-y-4 border border-gray-200"
                                        dangerouslySetInnerHTML={{
                                            __html: (() => {
                                                const parts = twoLine.split(/(?<=[.!?])\s+/); // split into sentences while keeping punctuation
                                                if (parts.length > 3) {
                                                    const newParts = [
                                                        parts[0], // first sentence
                                                        parts[1] + ' ' + parts[2], // combine second and third sentences
                                                        parts[3], // fourth becomes third
                                                    ];
                                                    return newParts.map(sentence => sentence.trim()).join('<br /><br />');
                                                }
                                                return parts.map(sentence => sentence.trim()).join('<br /><br />');
                                            })()
                                        }}
                                    />
                                )}


                                <button
                                    onClick={() => navigate(`/summary-phase/${phase}`, {
                                        state: { thirdSentence: thirdSentence }
                                    })}
                                    className="mt-6 bg-blue-600 text-white py-3 px-6 text-lg rounded-lg hover:bg-blue-700 transition-colors shadow-md w-full md:w-auto"
                                >
                                    View your Executive Business Summary
                                </button>
                            </div>
                        ) : (
                            // Questions Interface
                            <>
                                {/* Progress Bar */}
                                {questions.length > 0 && (
                                    <div className="w-full max-w-3xl mb-6">
                                        <div className="flex justify-between text-sm text-gray-600 mb-2 px-1">
                                            <span>Question {currentIndex + 1} of {questions.length}</span>
                                            <span>{progress}% Complete</span>
                                        </div>
                                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                {loading ? (
                                    // Loading State
                                    <div className="flex flex-col items-center justify-center p-12 w-full">
                                        <AiOutlineLoading3Quarters className="animate-spin text-blue-600 text-4xl mb-4" />
                                        <p className="text-gray-600 text-lg">Loading questions...</p>
                                    </div>
                                ) : questions.length > 0 && questions[currentIndex] ? (
                                    // Question Card
                                    <div className="w-full p-6 md:p-8 bg-white shadow-lg rounded-xl border border-gray-200">
                                        <p className="md:text-2xl text-xl font-semibold text-gray-800 border-b pb-4 mb-6">
                                            {questions[currentIndex]?.question}
                                        </p>

                                        {/* Estimate Prompt */}
                                        {shouldShowEstimatePrompt ? (
                                            <div className="my-6 p-4 bg-blue-50 text-blue-800 rounded-lg border border-blue-100 flex items-start gap-3">
                                                <div className="bg-blue-100 p-2 rounded-full mt-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-medium mb-1">Provide your estimate</p>
                                                    <p className="text-sm">Consider all relevant factors and be as specific as possible with your response.</p>
                                                </div>
                                            </div>
                                        ) : (
                                            // Multiple Choice Options
                                            <form className="mb-6 space-y-3">
                                                {regenerating ? (
                                                    <div className="text-gray-500 italic flex items-center justify-center gap-2 p-6 bg-gray-50 rounded-lg">
                                                        <AiOutlineLoading3Quarters className="animate-spin text-blue-500" />
                                                        <span>Regenerating options...</span>
                                                    </div>
                                                ) : questions[currentIndex]?.options?.length > 0 ? (
                                                    questions[currentIndex]?.options.map((opt, index) => (
                                                        <label
                                                            key={index}
                                                            className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer border transition text-lg
                                                                ${selectedAnswer === opt
                                                                    ? "bg-blue-50 border-blue-300 shadow-sm"
                                                                    : "hover:bg-gray-50 border-gray-200"}`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="answer"
                                                                value={opt}
                                                                checked={selectedAnswer === opt}
                                                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                                                className="form-radio text-blue-600 h-5 w-5"
                                                            />
                                                            <span>{opt}</span>
                                                        </label>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg text-center">
                                                        No options available for this question.
                                                    </p>
                                                )}
                                            </form>
                                        )}

                                        {/* Text Input Area */}
                                        <div className="mb-6">
                                            <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Answer:
                                            </label>
                                            <textarea
                                                id="answer"
                                                className="w-full p-4 min-h-[12rem] border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all"
                                                placeholder="Type your answer here..."
                                                value={selectedAnswer}
                                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                            ></textarea>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="mt-6 flex flex-col md:flex-row gap-4">
                                            {!shouldShowEstimatePrompt && (
                                                <button
                                                    onClick={() => regenerateOptions(questions[currentIndex]._id)}
                                                    className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors
                                                        ${questions[currentIndex]?.optionsCount >= 2 || regenerating
                                                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                            : "bg-yellow-500 text-white hover:bg-yellow-600"}`}
                                                    disabled={regenerating || questions[currentIndex]?.optionsCount >= 2}
                                                >
                                                    <FaRedo />
                                                    <span>Regenerate Options ({questions[currentIndex]?.optionsCount}/2)</span>
                                                </button>
                                            )}

                                            <button
                                                onClick={handleSubmit}
                                                className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors
                                                    ${!selectedAnswer.trim() || submitting
                                                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                        : "bg-green-600 text-white hover:bg-green-700"}`}
                                                disabled={submitting || !selectedAnswer.trim()}
                                            >
                                                {submitting ? (
                                                    <>
                                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                                        <span>Submitting...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaCheck />
                                                        <span>Submit Answer</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ) : null}
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}