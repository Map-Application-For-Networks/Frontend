import { Card, CardActions, CardContent, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import React,{useState} from "react";
const SignupPage = () => {
    
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});

    const handleSignup = () => {
        if (validate()) {
            const formData = {
              email,
              phoneNumber,
              name,
              password
            };
            alert("Signup successful")
          }
    }
const validate = () => {
    const newErrors = {};

    // Phone number validation: + sign optional, digits only
    const phoneRegex = /^\+?[0-9]*$/;
    // Email validation: must include @ and proper format
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
    if (!password) {
        newErrors.password = '*Password is required!';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
    return( <>
        <Card sx={{
            backgroundColor:"aliceblue",
            borderRadius:"8px",
            boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            padding: "20px"
            }}>
            <CardContent>
            <div style={{paddingBottom: "15px"}}>
                <Typography
                sx={{
                    fontSize: "27px",
                    textAlign:"center",
                    fontWeight:"bold",
                }}>
                    SIGN UP
                </Typography>
                </div>
                <TextField
                required
                id = "name"
                name = "name"
                label = "Full Name"
                fullWidth
                variant="outlined"
                sx={{margin:"10px"}}
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                />
                <TextField
                required
                id = "phoneNum"
                name = "phoneNum"
                label = "Phone Number"
                fullWidth
                variant="outlined"
                sx={{margin:"10px"}}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                />

                <TextField
                required
                id = "email"
                name = "email"
                label = "Email"
                type="email"
                fullWidth
                variant="outlined"
                sx={{margin:"10px"}}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                />

                <TextField
                required
                id = "password"
                name = "password"
                label = "Password"
                type="password"
                fullWidth
                variant="outlined"
                sx={{margin:"10px"}}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                />
            </CardContent>

            <CardActions
            sx={{justifyContent:"center"}}>
               <Button
                variant="contained"
                size="large"
                onClick={handleSignup}> 
                Sign up
                </Button>
            </CardActions>

        </Card>
    </>
    );

};
export default SignupPage