import React from 'react';
import { Box, Typography, Button, Card, CardContent, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ConfirmationPage = ({ referenceNumber }) => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/'); // Navigate to the homepage or any other desired route
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card
        sx={{
          padding: 4,
          borderRadius: 4,
          boxShadow: 4,
          textAlign: 'center',
          backgroundColor: '#f9f9f9', // Light background for a clean look
        }}
      >
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: '#4caf50' }} />
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Your marker has been accepted!
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            It will be checked by the authority and added to the map shortly.
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Your reference number is: <Typography component="span" color="primary">{referenceNumber}</Typography>
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToHome}
            sx={{ mt: 4, px: 4, borderRadius: '20px' }} // Rounded button for a modern look
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ConfirmationPage;
