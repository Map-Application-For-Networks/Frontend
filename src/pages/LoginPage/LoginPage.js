import React, { useState } from 'react';
import { TextField, Button, Link, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import ExRNAIcon from '../../icons/ExRNA_PATH_Logo-3.png'; // Add the icon image (correct the path if needed)
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = '*Email is required!';
    } else if (!emailRegex.test(email)) {
      newErrors.email = '*Please enter a valid email address!';
    }

    if (!password) {
      newErrors.password = '*Password is required!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginClick = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('https://backend-delta-seven-47.vercel.app/api/login', {
          username: email, // Replace 'username' if backend expects 'email'
          password: password,
        });
  
        // Save token to localStorage
        localStorage.setItem('token', response.data.token);
  
        console.log('Login successful');
        navigate('/admin'); // Navigate to the dashboard
      } catch (error) {
        if (error.response) {
          // Handle server errors
          alert(error.response.data.message || 'Login failed. Please try again.');
        } else {
          // Handle network or other errors
          console.error('Error:', error.message);
          alert('An error occurred while logging in. Please try again.');
        }
      }
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        {/* Add the logo at the top */}
        <img src={ExRNAIcon} alt="ExRNA PATH Logo" className="form-logo" />

        <Divider textAlign="left">Login to Your Account</Divider>

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />

        <div className="button-container">
          <Button variant="contained" onClick={handleLoginClick}>
            Login
          </Button>
        </div>

        <div className="centered-link">
          <Link href="/signup" underline="hover">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
