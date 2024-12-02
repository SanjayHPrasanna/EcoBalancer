import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import './ContactUs.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send form data to the backend
            const response = await axios.post('http://localhost:5000/contactus', formData, {
                headers: { 'Content-Type': 'application/json' },
            });

            console.log(response.data.message);
            setIsSubmitted(true); // Update submission status
            setFormData({ name: '', email: '', message: '' }); // Reset form fields
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="contact-us">
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
                
            </header>

            <section className="hero">
                <h1>Contact Us</h1>
                <p>Have questions or need help? Reach out to us using the form below or connect with us on social media.</p>
            </section>

            <section className="contact-form">
                <h2>Get in Touch</h2>
                {isSubmitted ? (
                    <p className="success-message">Thank you for your message! We'll get back to you shortly.</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-button">Send Message</button>
                    </form>
                )}
            </section>

            <section className="social-media">
                <h2>Connect with Us</h2>
                <div className="social-buttons">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-button twitter">
                        <i className="fab fa-twitter"></i> Twitter
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-button facebook">
                        <i className="fab fa-facebook-f"></i> Facebook
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-button instagram">
                        <i className="fab fa-instagram"></i> Instagram
                    </a>
                </div>
            </section>

            <footer className="footer">
                <p>© 2024 Eco Balancer AI. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ContactUs;
