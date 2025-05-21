import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../config/apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

function QuestionsForm() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    const access_token = localStorage.getItem("access_token");
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;
    const projectId = localStorage.getItem("nProject");
    const category = "NONE";

    // const subCategoryPassed = "NONE";

    const fetchUnansweredQuestions = async () => {
        setErrorMessage("");
        setLoading(true);
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/test-new/questions/${category}/${projectId}`,
                {
                    method: "GET", // Specify the HTTP method if needed
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${access_token}` // Include the token in the request headers
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                if (!data || !data.data || data.data.length === 0) {
                    navigate("/start");
                } else {
                    setQuestions(data.data);

                    // Initialize answers object
                    const initialAnswers = {};
                    data.data.forEach((q) => {
                        initialAnswers[q._id] = "";
                    });
                    setAnswers(initialAnswers);
                }
            } else {
                throw new Error("Failed to fetch questions.");
            }
        } catch (error) {
            console.error(error.message);
            setErrorMessage("Failed to fetch questions.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUnansweredQuestions();
    }, []);

    const handleTextChange = (e, questionId) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            for (const question of questions) {
                const data = {
                    userId,
                    projectId,
                    questionId: question._id,
                    answer: answers[question._id],
                    phase: category,
                };

                console.log("Submitting:", data);

                const response = await fetch(`${API_BASE_URL}/api/test-answer`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access_token}`,
                    },
                    body: JSON.stringify({ data }),
                });

                if (!response.ok) {
                    const result = await response.json();
                    throw new Error(result.error || "Failed to submit the answer.");
                }

                console.log("Answer submitted for question:", question._id);
            }

            navigate("/start");
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Welcome to Craddule
                </h2>
                <p className="text-center" >
                    Let us get your tools set, please answer all questions below – please answer robustly but within 500 words
                </p>
                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                )}
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <FontAwesomeIcon icon={faCircleNotch} className="fa-spin text-3xl text-blue-600" />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {questions.map((question) => (
                            <div key={question._id} className="space-y-2">
                                <label
                                    htmlFor={`question-${question._id}`}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {question.question}
                                </label>
                                <input
                                    type="text"
                                    id={`question-${question._id}`}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your answer"
                                    value={answers[question._id] || ""}
                                    onChange={(e) => handleTextChange(e, question._id)}
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />
                            ) : (
                                "Submit Answer"
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default QuestionsForm;
