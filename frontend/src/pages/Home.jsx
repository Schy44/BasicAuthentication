import React, { useEffect, useState } from "react";
import homefetch from "../components/fetchings";
import { mylogout, getUserInfo } from "../auth/auth";
import "../assets/Home.css";

const Home = () => {
    const [message, setMessage] = useState("Fetching...");
    const [username, setUsername] = useState("Guest");

    useEffect(() => {
        const user = getUserInfo();
        if (user?.username) {
            setUsername(user.username);
        }

        const fetchData = async () => {
            const fetchedMessage = await homefetch();
            setMessage(fetchedMessage || "Failed to fetch message");
        };

        fetchData();
    }, []);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">MyApp</div>
                <div className="navbar-links">
                    <a href="#">Home</a>
                    <a href="#">Profile</a>
                    <button onClick={mylogout} className="logout-btn">Logout</button>
                </div>
            </nav>

            <section className="hero">
                <h1>Welcome to the Dashboard</h1>
                <p className="subtitle">Hello, <strong>{username}</strong> 👋</p>
                <p className="subtitle">Your personalized message is below:</p>
                <p className="message">{message}</p>
            </section>
        </>
    );
};

export default Home;