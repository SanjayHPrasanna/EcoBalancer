import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { Link } from 'react-router-dom';
import './Signup.css'; // Import the CSS file for styling

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        company_name:'',
        email: '',
        password: '',
        confirmPassword: '' // Add confirmPassword field
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signup', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            alert(response.data.message);
        } catch (error) {
            console.error('Error during signup:', error);
            alert(error.response?.data?.message || 'Something went wrong!');
        }
    };
    

    return (
        <div className="signup-container">
            {/* Left side: Company Name and Content */}
            <div className="left-side">
                <h1 className="company-name">Eco Balancer AI</h1>
                <p className="company-description">
                    Eco Balancer AI is dedicated to helping individuals and businesses balance their carbon footprints
                    using advanced artificial intelligence to create a sustainable future. Join us in making a positive
                    impact on the planet!
                </p>
            </div>

            {/* Right side: Signup Form */}
            <div className="right-side-signup">
                <h2 className="signup-heading">Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Company Name:</label>
                        <input
                            type="text"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>
                    <button type="submit" className="signup-button">
                        Signup
                    </button>
                </form>
                <p className="login-link">
                    Already have an account?{' '}
                    <Link to="/login" className="login-link-text">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
