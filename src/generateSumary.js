import React from 'react'
import { API_BASE_URL } from './config/apiConfig';
import { jwtDecode } from 'jwt-decode';

function generateSumary() {
    const projectId = localStorage.getItem("nProject");
    const token = localStorage.getItem("access_token");
    const decodedToken = token ? jwtDecode(token) : { userId: "" };
    const userId = decodedToken.userId;
    const { phase } = useParams();

    const formatPhase = (text) => {
        return text
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
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


    return (
        <div>

        </div>
    )
}

export default generateSumary
