import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = ({ loginStatus }) => {
    const redirectToChatbot = () => {
        window.location.href = "http://localhost:8501"; // Or your hosted Streamlit URL
    };

    return (
        <div className='main'>
            {/* Header Section */}
            <header className="header">
                <div className="logo">Eco Balancer AI</div>
                <nav className="navigation">
                    <Link to="/">Home</Link>
                    <a href="http://localhost:8501"> Eco Balancer AI</a>
                    <Link to="/marketplace">Marketplace</Link>
                    <Link to="/insights">Insights</Link>
                    <Link to="/AboutUs">About Us</Link>
                    <Link to="/ContactUs">Contact Us</Link>
                </nav>

                {/* Conditional rendering of login and signup buttons */}
                {!loginStatus && (
                    <div className="auth-buttons">
                        <Link to="/login" className="button">Login</Link>
                        <Link to="/signup" className="button primary">Sign Up</Link>
                    </div>
                )}
            </header>

            {/* Body Image with Hero Container */}
            <div className='bodyimage'>
                <div className="hero-container">
                    <Link to="/marketplace" className="button">Explore Marketplace</Link>
                </div>
            </div>

            {/* Hero Section */}
            <section className="hero">
                <h1>Empowering Organizations to Achieve Carbon Neutrality with AI</h1>
                <p>
                    Leveraging advanced AI technology, our platform ensures precision in tracking and managing your carbon footprint.
                    Discover our integrated marketplace where businesses can not only analyze their impact but also invest in carbon credits to offset emissions.
                    Join a community of sustainability-driven organizations transforming the future, one step closer to carbon neutrality.
                </p>
                <br />
                <div className="hero-buttons">
                    <button onClick={redirectToChatbot} className="button primary">Eco Balancer AI</button>
                </div>
            </section>

            {/* About Section */}
            <section className="about">
                <div className="features">
                    <div className="feature">
                        <h3>AI-Powered Analysis</h3>
                        <p>Track Scope 1, 2, and 3 emissions with precision.</p>
                    </div>
                    <div className="feature">
                        <h3>Insights & Dashboards</h3>
                        <p>Visualize real-time emissions trends with Power BI.</p>
                    </div>
                    <div className="feature">
                        <h3>B2B Matching Marketplace</h3>
                        <p>Discover the best decarbonization solutions tailored to your needs.</p>
                    </div>
                </div>
              
            </section>

            {/* Footer Section */}
            <footer className="footer">
                <div className="footer-links">
                <Link to="/AboutUs">About Us</Link>
                <Link to="/ContactUs">Contact Us</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Service</Link>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
