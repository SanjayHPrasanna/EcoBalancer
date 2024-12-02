import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AboutUs.css'
import Hemanth from "../Image/Hemanth.png"
import anjali from "../Image/anjali.JPG"
import manasa from "../Image/manasa.jpg"
import sanjay from "../Image/sanjay.jpg"
import vijayalakshmi from "../Image/vijayalakshmi.jpg";
import Chitra from "../Image/Chitra.jpg";
import suguna from "../Image/suguna.jpg";
import Prajwal from "../Image/Prajwal.jpg"
import Ankit from "../Image/Ankit.jpg"
import Sameer from "../Image/Sameer.jpg"
import user from "../Image/user.png"


const AboutUs = () => {
    return (
        <div className="about-us">
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

            <section className="hero">
                <h1>About Us</h1>
                <p>
                    At Eco Balancer AI, our mission is to empower organizations and individuals to achieve carbon neutrality.
                    Through advanced AI tools and actionable insights, we are bridging the gap between environmental
                    responsibility and economic efficiency.
                </p>
            </section>

            <section className="our-story">
                <h2>Our Story</h2>
                <p>
                    Founded by a team of passionate environmentalists, automation engineers and data engineers, Eco Balancer AI began as a vision
                    to simplify carbon emission tracking. We recognized the growing need for businesses to understand their
                    carbon footprints, reduce emissions, and take meaningful steps toward sustainability.
                </p>
            </section>

            <section className="team">
                <h2>Meet Our Team</h2>
                    <div className="team-grid">
                    <div className="team-member">
                        <img src={Hemanth} alt="Data Scientist" />
                        <h3>Vanam Hemanth</h3>
                        <p>Data Engineer</p>
                    </div>
                    <div className="team-member">
                        <img src={manasa} alt="Founder" />
                        <h3>Manasa</h3>
                        <p>Data Engineer</p>
                    </div>
                    <div className="team-member">
                        <img src={Prajwal} alt="Founder" />
                        <h3>Prajwal Prasanna</h3>
                        <p>Automation Engineer</p>
                    </div>
                    <div className="team-member">
                        <img src={vijayalakshmi} alt="Founder" />
                        <h3>Vijayalaxmi Acharya</h3>
                        <p>Automation Engineer</p>
                    </div>
                    <div className="team-member">
                        <img src={sanjay} alt="Founder" />
                        <h3>Sanjay Prasanna</h3>
                        <p>Data Engineer</p>
                    </div>
                    <div className="team-member">
                        <img src={Chitra} alt="Founder" />
                        <h3>Chithra Damodaran</h3>
                        <p>Product Delivery Manager</p>
                    </div>
                    <div className="team-member">
                        <img src={Ankit} alt="CTO" />
                        <h3>Ankit Sharma</h3>
                        <p>Solution Architect</p>
                    </div>
                    <div className="team-member">
                        <img src={anjali} alt="Founder" />
                        <h3>Anjali Ramachandra Koli</h3>
                        <p>Automation Engineer</p>
                    </div>
                    <div className="team-member">
                        <img src={Sameer} alt="Founder" />
                        <h3>Sameer Sibaragatti</h3>
                        <p>Automation Engineer</p>
                    </div>
                    <div className="team-member">
                        <img src={suguna} alt="Founder" />
                        <h3>Suguna Ganesan</h3>
                        <p>Senior Consultant</p>
                    </div>
                    <div className="team-member">
                        <img src={user} alt="Founder" />
                        <h3>VR</h3>
                        <p>Automation Engineer</p>
                    </div>
                    <div className="team-member">
                        <img src={user} alt="Founder" />
                        <h3>Kota Murali Mohan Reddy</h3>
                        <p>Automation Engineer</p>
                    </div>
                    <div className="team-member">
                        <img src={user} alt="Founder" />
                        <h3>Varun DM</h3>
                        <p>Automation Engineer</p>
                    </div>
                    <div className="team-member">
                        <img src={user} alt="Founder" />
                        <h3>Gokul Tk</h3>
                        <p>Automation Engineer</p>
                    </div>
                </div>
            </section>
            <footer className="footer">
                <p>© 2024 Eco Balancer AI. All rights reserved.</p>
            </footer>
        </div>
    );
};


export default AboutUs;
