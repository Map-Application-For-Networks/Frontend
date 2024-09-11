import { Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React,{useState} from "react";
const LoginPage = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [errors, setErrors] = useState({});

    const handleLogin = () => {
        if (validate()) {
            const formData = {
              email,
              password
            };
            alert("Login successful")
          }
    }
    const validate = () => {
        const newErrors = {};

        // Email validation: must include @ and proper format
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
                    fontWeight:"bold"
                }}>
                   LOG IN 
                </Typography>
                </div>
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
                onClick={handleLogin}
                size="large"
                > 
                Login 
                </Button>
            </CardActions>
        </Card>
    </>
    );

};
export default LoginPage