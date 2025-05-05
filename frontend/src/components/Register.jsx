import React, { useState } from "react";
import { myRegister } from "../auth/auth";
import "../assets/auth.css"; // assuming CSS is stored here

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Added confirm password state

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await myRegister(username, email, password);
            console.log("Registration successful");
            window.location.href = "/login";
        } catch (error) {
            console.error("Registration failed:", error.response?.data || error.message);
        }
    };

    return (
        <div className="auth-fullscreen">
            <div className="auth-container">
                <h2 className="auth-title">Register</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
                <div className="auth-footer">
                    <p>
                        Already have an account?{" "}
                        <a href="/login" className="auth-link">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
