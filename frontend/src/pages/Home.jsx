import React, { useEffect, useState } from "react";
import homefetch from "../components/fetchings";
import { mylogout, getUserInfo } from "../auth/auth";
import "../assets/Home.css";

const Home = () => {
    const [message, setMessage] = useState("Fetching...");
    const user = getUserInfo(); // get user data from token

    useEffect(() => {
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
                <p className="subtitle">Hello, <strong>{user?.username || "Guest"}</strong> 👋</p>
                <p className="subtitle">Your personalized message is below</p>
            </section>

            <section className="message-box">
                <h3>Username Message:</h3>
                <p>{message}</p>
            </section>
        </>
    );
};

export default Home;
