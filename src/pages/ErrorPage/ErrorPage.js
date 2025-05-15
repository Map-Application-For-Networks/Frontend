import React from 'react';
import { Box, Typography, Button, Card, CardContent, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate, useLocation } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const errorMessage = state?.error || 'An unexpected error occurred. Please try again later.';

  const handleBackToHome = () => {
     navigate(-1);
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card
        sx={{
          padding: 4,
          borderRadius: 4,
          boxShadow: 4,
          textAlign: 'center',
          backgroundColor: '#fff5f5', // Light red background for error
        }}
      >
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <ErrorOutlineIcon sx={{ fontSize: 60, color: '#f44336' }} />
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Something went wrong!
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            {errorMessage} Please try again. If the issue persists, please contact the administrator.
          </Typography>

          <Button
            variant="contained"
            color="error"
            onClick={handleBackToHome}
            sx={{ mt: 4, px: 4 }}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ErrorPage;
