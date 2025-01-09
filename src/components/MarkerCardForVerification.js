import React from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Button, Box, Chip } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VerifiedIcon from '@mui/icons-material/Verified';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import axios from 'axios';

const MarkerCardForVerification = ({ marker, onMarkerUpdate }) => {
  const { _id, title, details, geocode, email, phone, visitStatus, verified, date, createdAt, updatedAt, researchFieldTopic, role } = marker;

  const token = localStorage.getItem('token'); // Retrieve token

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getStatusColor = (status) => {
    return status.toLowerCase() === 'open' ? 'success' : 'error';
  };

  const handleApprove = async () => {
    try {
      await axios.patch(
        `http://localhost:3001/api/marker/${_id}/verify`,
        { verified: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onMarkerUpdate(_id, 1); // Notify parent
    } catch (error) {
      console.error('Error approving marker:', error);
    }
  };

  const handleDisapprove = async () => {
    try {
      await axios.patch(
        `http://localhost:3001/api/marker/${_id}/verify`,
        { verified: 0 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onMarkerUpdate(_id, 0); // Notify parent
    } catch (error) {
      console.error('Error disapproving marker:', error);
    }
  };

  return (
    <Card sx={{ minWidth: 275, margin: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title} {verified ? <VerifiedIcon color="primary" /> : <NewReleasesIcon color="error" />}
        </Typography>
        <Box sx={{ backgroundColor: '#f3f6f9', borderRadius: 1, padding: 2, marginY: 1 }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Details
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {details}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item>
            <IconButton color="primary">
              <RoomIcon />
            </IconButton>
            {geocode[0]}, {geocode[1]}
          </Grid>
          <Grid item>
            <IconButton color="primary">
              <EmailIcon />
            </IconButton>
            {email}
          </Grid>
          <Grid item>
            <IconButton color="primary">
              <PhoneIcon />
            </IconButton>
            {phone}
          </Grid>
          <Grid item>
            <IconButton color="primary">
              <CalendarTodayIcon />
            </IconButton>
            {formatDate(date)} (Created: {formatDate(createdAt)}, Updated: {formatDate(updatedAt)})
          </Grid>
          <Grid item>
            <IconButton color="primary">
              <AssignmentIcon />
            </IconButton>
            {role}
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
          Research Fields:
        </Typography>
        {researchFieldTopic.map((topic) => (
          <Chip key={topic} label={topic} variant="outlined" sx={{ mt: 1, mr: 1 }} />
        ))}
        <Typography variant="body2" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
          Visit Status:
        </Typography>
        <Chip label={visitStatus} color={getStatusColor(visitStatus)} />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="success" startIcon={<VerifiedIcon />} sx={{ mr: 1 }} onClick={handleApprove}>
            Approve
          </Button>
          <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDisapprove}>
            Disapprove
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MarkerCardForVerification;
