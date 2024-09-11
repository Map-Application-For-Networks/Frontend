import React, { useState } from 'react';
import { TextField, Button, Link, Divider } from '@mui/material';
import './SignupPage.css';
import ExRNAIcon from '../icons/ExRNA_PATH_Logo-3.png'; 

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    const phoneRegex = /^\+?[0-9]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) newErrors.name = '*Name is required!';
    if (!email) {
      newErrors.email = '*Email is required!';
    } else if (!emailRegex.test(email)) {
      newErrors.email = '*Please enter a valid email address!';
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = '*Phone number is required!';
    } else if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = '*Phone number must include only + and digits!';
    }
    if (!password) newErrors.password = '*Password is required!';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignupClick = () => {
    if (validateForm()) {
      console.log('Signup successful');
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <img src={ExRNAIcon} alt="ExRNA PATH Logo" className="form-logo" />
        
        <Divider textAlign="left">Create Your Account</Divider>

        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />

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
          label="Phone Number"
          variant="outlined"
          type="tel"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
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
          <Button variant="contained" onClick={handleSignupClick}>
            Sign Up
          </Button>
        </div>

        <div className="centered-link">
          <Link href="/login" underline="hover">
            Already have an account? Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
