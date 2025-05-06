import axios from "axios";
import { jwtDecode } from "jwt-decode";

const getUserInfo = () => {
    const token = localStorage.getItem("access_token");
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
        return { username: decoded.username }; // Ensure username is returned
    } catch (err) {
        console.error("Invalid token", err);
        return null;
    }
};



const mylogin = async (username, password) => {
    try {
        const { data } = await axios.post(
            "http://127.0.0.1:8000/api/token/",
            { username, password },
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        localStorage.clear();
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("username", data.username);
        window.location.href = "/";
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        return null;
    }
};

const myRegister = async (username, email, password) => {
    try {
        const { data } = await axios.post(
            "http://127.0.0.1:8000/api/register/",
            { username, email, password },
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        console.log("Registration successful", data);
        window.location.href = "/login";
        return data;
    } catch (error) {
        console.error(
            "Registration failed:",
            error.response?.data || error.message
        );
        return null;
    }
};

const mylogout = async () => {
    try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.post(
            "http://127.0.0.1:8000/api/logout/",
            { refresh_token: localStorage.getItem("refresh_token") },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );

        console.log("Logout successful", response);

        // Clear tokens and redirect to login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
    } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
        return null;
    }
};

export { mylogin, myRegister, mylogout, getUserInfo };