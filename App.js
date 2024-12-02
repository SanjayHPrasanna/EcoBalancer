import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import HomePage from './Components/HomePage'; // Your HomePage component
import Insights from './Insights';
import Marketplace from './Components/Marketplace';
import AboutUs from './Components/AboutUs';
import ContactUs from './ContactUs';

function App() {
    const [loginStatus, setLoginStatus] = useState(false); // Manage login status

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage loginStatus={loginStatus} />} />
                <Route path="/login" element={<Login setLoginStatus={setLoginStatus} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/Insights" element={<Insights />} />
                <Route path="/Marketplace" element={<Marketplace />} />
                <Route path="/AboutUs" element={<AboutUs/>} />
                <Route path="/ContactUs" element={<ContactUs />} />
            </Routes>
        </Router>
    );
}

export default App;
