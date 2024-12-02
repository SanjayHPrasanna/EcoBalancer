import React from 'react';
import '../styles/Marketplace.css'

const Marketplace = () => {
    const marketplaceData = [
        { 
            id: 1, 
            companyName: 'EcoAgri', 
            credits: 60, 
            standard: 'VCS', 
        },
        { 
            id: 2, 
            companyName: 'GreenPlanet Corp', 
            credits: 30, 
            standard: 'Gold Standard', 
        },
        { 
            id: 3, 
            companyName: 'CarbonNeutral Ltd', 
            credits: 50, 
            standard: 'VCS', 
        },
    ];

    return (
        <div className='main'>
            {/* Header Section */}
            <header className="header">
                <div className="logo">Eco Balancer AI</div>
                <nav className="navigation">
                    <a href="/">Home</a>
                    <a href="http://localhost:8501" > Eco Balancer AI</a>
                    <a href="/marketplace">Marketplace</a>
                    <a href="/insights">Insights</a>
                    <a href="/AboutUs">About Us</a>
                    <a href="/ContactUs">Contact Us</a>
                </nav>
                
            </header>

            <h1 className="marketplace-title">Carbon Credits Marketplace</h1>
            <div className="marketplace-grid">
                {marketplaceData.map((item) => (
                    <div key={item.id} className="card">
                        <h2 className="company-name">{item.companyName}</h2>
                        <p>Credits Available: <strong>{item.credits}</strong> tons</p>
                        <p>Standard: <strong>{item.standard}</strong></p>
                        <button className="buy-button">Buy Credits</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marketplace;

