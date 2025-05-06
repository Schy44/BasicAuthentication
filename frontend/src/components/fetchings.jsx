import axios from "axios";

const homefetch = async () => {
    try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            throw new Error("Access token is missing. Please log in.");
        }

        const response = await axios.get("http://127.0.0.1:8000/api/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response?.data?.message) {
            console.log("Fetched Message:", response.data.message);
            return response.data.message;
        } else {
            throw new Error("Message not found in the response.");
        }
    } catch (error) {
        if (error.response?.status === 401) {
            console.error("Unauthorized: Token may have expired. Redirecting to login.");
            // Redirect to login page or handle re-authentication
        }
        console.error(
            "HomeFetch failed:",
            error.response?.data?.detail || error.message || "Unknown error"
        );
        return null;
    }
};

export default homefetch;