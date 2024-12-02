import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners'; // Using PacmanLoader for animation
import './Login.css';
import './styles/Spinner.css'

const Login = ({ setLoginStatus }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false); // Loader state
    const navigate = useNavigate(); // For redirection

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
            const response = await axios.post('http://localhost:5000/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data.message);

            if (response.data.message === 'Login successful') {
                setLoginStatus(true); // Update the login status to true
                setIsLoading(true);  // Show loader

                // Redirect to the homepage after 3 seconds
                setTimeout(() => {
                    setIsLoading(false);
                    navigate('/');
                }, 3000);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert(error.response?.data?.message || 'Invalid credentials!');
        }
    };

    return (
        <div className="login-container">
            {/* Show loader if loading */}
            {isLoading ? (
                <div className="spinner-container">
                    <PacmanLoader color={"#000000"} loading={true} size={50} />
                    </div>
            ) : (
                <>
                    {/* Left side: Company Name and Content */}
                    <div className="left-side">
                        <h1 className="company-name">Eco Balancer AI</h1>
                        <p className="company-description">
                            Eco Balancer AI is dedicated to helping individuals and businesses balance their carbon footprints
                            using advanced artificial intelligence to create a sustainable future. Join us in making a positive
                            impact on the planet!
                        </p>
                    </div>

                    {/* Right side: Login Form */}
                    <div className="right-side-login">
                        <h2 className="login-heading">Login</h2>
                        <form onSubmit={handleSubmit}>
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
                            <button type="submit" className="login-button">
                                Login
                            </button>
                        </form>
                        <p className="signup-link">
                            Don't have an account?{' '}
                            <Link to="/signup" className="signup-link-text">
                                Signup here
                            </Link>
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Login;
