import React from 'react';
import { Link } from 'react-router-dom';

const Insights = () => {
    return (
        <div>
            {/* Header */}
            <header className="header">
                <div className="logo">Eco Balancer AI</div>
                <nav className="navigation">
                    <Link to="/">Home</Link>
                    <a href="http://localhost:8501" > Eco Balancer AI</a>
                    <Link to="/marketplace">Marketplace</Link>
                    <Link to="/insights">Insights</Link>
                    <Link to="/AboutUs">About Us</Link>
                    <Link to="/ContactUs">Contact Us</Link>
                </nav>
                
            </header>

            {/* Main Content */}
            <main
                style={{
                    padding: '20px',
                    maxWidth: '1140px',
                    margin: '0 auto',
                    textAlign: 'center',
                }}
            >
                <h1>Eco-Carbon Balancer Insights</h1>
                <p>
                    Explore the interactive dashboard to gain insights on carbon emissions and eco-balancing strategies.
                </p>

                {/* Embed Power BI Dashboard */}
                <div
                    style={{
                        margin: '20px 0',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        overflow: 'hidden',
                    }}
                >
                    <iframe
                        title="Eco-Carbon Balancer"
                        width="100%"
                        height="541.25"
                        src="https://app.powerbi.com/reportEmbed?reportId=51c972a8-f40c-40f9-a363-94fc1f4511ae&autoAuth=true&ctid=28359286-b319-42c7-9adf-5f512aeb0435"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            </main>
        </div>
    );
};

export default Insights;
