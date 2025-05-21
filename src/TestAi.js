import { useState, useEffect } from "react";
import { API_BASE_URL } from "./config/apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaRedo, FaCheck } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import home from './images/HOME.png';
import Header from "./component/header";
import circle from './images/circle.png';
import bg from './images/pattern_landscape.png';
import feedback from './images/feedback.svg';



export default function QuestionOptions() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [regenerating, setRegenerating] = useState(false);
    const [phaseComplete, setPhaseComplete] = useState(false);
    const [boxes, setBoxes] = useState([]);
    const projectId = localStorage.getItem("nProject");
    const token = localStorage.getItem("access_token"); // Retrieve Bearer token
    const decodedToken = jwtDecode(token);
    const [selectedBox, setSelectedBox] = useState(null);
    const userId = decodedToken.userId;
    const { phase } = useParams();
    const navigate = useNavigate();



    const phaseUrls = {
        Ideation: ["/customFinancial", "/go/Ideation"],
        ProductDefinition: ["/branding", "/go/ProductDefinition"],
        InitialDesign: ["/go/InitialDesign"],
        ValidatingAndTesting: ["/go/ValidatingAndTesting"],
        Commercialization: ["/go/Commercialization"],
    };

    const urls = phaseUrls[phase] || []; // Fallback to an empty array if phase is undefined

    console.log(urls);

    const formatLabel = (url) => {
        if (url === "/customFinancial") return "Custom Financial Projection";
        if (url === "/branding") return "Branding";
        if (url.startsWith("/go/")) return "Go No Go";
        return url.replace("/go/", "").replace("/", "").toUpperCase();
    };

    useEffect(() => {
        fetchQuestions();
    }, []);



    const fetchTask = async () => {
        try {
            // console.log(projectId);
            // console.log(API_BASE_URL);
            const response = await fetch(`${API_BASE_URL}/api/timeline/projects/${projectId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("here");
            console.log("here");
            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                setBoxes(data);

            } else {
                const result = await response.json();
                console.error('Error:', result['error']);
            }

        } catch (err) {

            setLoading(false);
            console.log(err);
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
            }

            // Fetch tasks after fetching questions
            await fetchTask();
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
        setLoading(false);
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
            console.log(data)
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
                }
            }
        } catch (error) {
            console.error("Error submitting answer:", error);
        }

        setSubmitting(false);
    };

    const formatPhase = (text) => {
        return text
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };
    const formattedPhase = formatPhase(phase)

    console.log(questions)


    return (
        <div
            style={{
                fontFamily: '"Manrope", sans- serif'
            }}
        >
            <Header />
            <div className='container relative'>


                <div
                    className=" bg-cover bg-center h-screen"
                // style={{ backgroundImage: `url(${bg})` }}
                >
                    <div className="absolute inset-0 mt-[50px] ml-[60px]  z-[-100] bg-no-repeat bg-cover w-[200px] h-[200px] " style={{ backgroundImage: `url(${circle})` }}></div>

                    <div className=' flex justify-evenly' >
                        <div className="mr-auto ">
                            <button className="mainBtn" onClick={() => navigate('/start')} >Back to Phases</button>
                        </div>
                        <div className=' m-auto' >
                            <p className='text-center font-bold md:text-[16px] text-[14px] ' > {formattedPhase} Phase</p>
                            {/* <p className='text-center text-[#545454] font-semibold ' >Here Create custom graphs that gives you more insight</p> */}
                        </div>
                        <div className="w-[100px]"  >
                            <img src={home} />

                        </div>
                    </div>

                    <div className="flex  flex-col items-center gap-4 p-6">
                        <h5 className="text-xl font-bold">
                            {phase?.replace(/([A-Z])/g, " $1").trim()}
                        </h5>
                        <div className="flex flex-wrap gap-3">
                            {urls.map((url, index) => (
                                <button
                                    key={index}
                                    onClick={() => navigate(url)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    {formatLabel(url)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div
                        className="min-h-[70vh] bg-white bg-[url('./images/pattern_landscape.png')] bg-cover bg-no-repeat"
                    >
                        {/* <div className="flex items-center justify-between">
                            <p className="text-[17px]">Question {currentIndex + 1} of {questions.length}</p>
                            <button onClick={() => navigate('/uploadTask')} className="mainBtn" style={{ marginTop: 10, marginBottom: 15 }}>
                                Create Task
                            </button>
                        </div> */}

                        <div className="flex flex-col items-center gap-1 p-1 min-h-screen">

                            {phaseComplete ? (
                                <div className="text-center bg-white shadow-lg p-1 rounded-lg">
                                    <h6 className="text-[15px] md:text-[17px] font-bold text-green-600">🎉 <br/> Congratulations! <br/> 🎉</h6>
                                    <p className="text-lg mt-4">You have successfully completed the <strong> {formattedPhase}</strong> phase.</p>
                                    <button
                                        onClick={() => navigate(`/summary-phase/${phase}`)}
                                        className="mt-6 bg-blue-600 text-white py-2 px-3 text-lg rounded-lg hover:bg-blue-700 transition"
                                    >
                                        View Summary
                                    </button>
                                </div>
                            ) : (
                                <>

                                    {/* Progress Bar */}
                                    {questions.length > 0 && (
                                        <>
                                            <div className="w-full">
                                                <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden mb-2 relative">
                                                    <div
                                                        className="h-full bg-blue-600 transition-all"
                                                        style={{ width: `${(currentIndex / questions.length) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {loading ? (
                                        <div className="text-gray-600 text-lg flex items-center gap-2 animate-pulse">
                                            <AiOutlineLoading3Quarters className="animate-spin" /> Loading...
                                        </div>
                                    ) : questions.length > 0 && questions[currentIndex] ? (
                                        <div className="w-full p-6 bg-white shadow-lg rounded-xl border">
                                            <h6 className="md:text-2xl text-[18px] font-semibold text-gray-800 border-b pb-3">
                                                {questions[currentIndex]?.question}
                                            </h6>

                                            <form className="mt-4 space-y-4">
                                                {regenerating ? (
                                                    <p className="text-gray-500 italic flex items-center gap-2">
                                                        <AiOutlineLoading3Quarters className="animate-spin" /> Regenerating options...
                                                    </p>
                                                ) : questions[currentIndex]?.options?.length > 0 ? (
                                                    questions[currentIndex]?.options.map((opt, index) => (
                                                        <label
                                                            key={index}
                                                            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition text-lg"
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="answer"
                                                                value={opt}
                                                                checked={selectedAnswer === opt}
                                                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                                                className="form-radio text-blue-600"
                                                            />
                                                            {opt}
                                                        </label>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-500 italic">No options available.</p>
                                                )}
                                            </form>

                                                    <textarea
                                                        className="w-full p-3 min-h-[15rem] border rounded-lg mt-4"
                                                        placeholder="Type your answer here..."
                                                        value={selectedAnswer}
                                                        onChange={(e) => setSelectedAnswer(e.target.value)}
                                                    ></textarea>



                                            <div className="mt-6 flex flex-col gap-4">
                                                <button
                                                    onClick={() => regenerateOptions(questions[currentIndex]._id)}
                                                    c className="w-full bg-yellow-500 text-white py-2 rounded-full hover:bg-yellow-600 transition flex items-center justify-center gap-2"
                                                    disabled={regenerating || questions[currentIndex]?.optionsCount >= 2}
                                                >
                                                    <FaRedo /> Regenerate Options ({questions[currentIndex]?.optionsCount}/2)
                                                </button>
                                                <button
                                                    onClick={handleSubmit}
                                                    className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition flex items-center justify-center gap-2"
                                                    disabled={submitting || !selectedAnswer.trim()}
                                                >
                                                    <FaCheck /> {submitting ? "Submitting..." : "Submit Answer"}
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
    );
}
