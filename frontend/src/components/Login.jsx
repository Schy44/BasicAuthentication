import React, { useState } from "react";
import { mylogin } from "../auth/auth";
import { Link } from "react-router-dom";
import "../assets/Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await mylogin(username, password);
            console.log("Login successful");
            window.location.href = "/";
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
        }
    };

    const handleGoogleLogin = () => {
        console.log("Login with Google");
    };

    return (
        <div className="auth-fullscreen">
            <h2 className="auth-title">Login</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <div className="auth-footer">
                <p>
                    Don't have an account?{" "}
                    <Link to="/register" className="auth-link">Register</Link>
                </p>
                <p>
                    <Link to="/forgot-password" className="auth-link">Forgot Password?</Link>
                </p>
                <button onClick={handleGoogleLogin} className="google-login-btn">
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
