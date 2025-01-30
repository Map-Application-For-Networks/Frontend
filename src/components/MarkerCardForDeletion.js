import React from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Button, Box} from '@mui/material';
import { Tag } from 'antd';
import RoomIcon from '@mui/icons-material/Room';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VerifiedIcon from '@mui/icons-material/Verified';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import axios from 'axios';

const MarkerCardForDeletion = ({ marker, onMarkerUpdate }) => {
  const { _id ,title, details, geocode, email, phone, visitStatus, verified, date, createdAt, updatedAt, techTags, modelTags, expertiseAreaTags, role } = marker;

  const token = localStorage.getItem('token'); // Retrieve token

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Function to determine the color of the visit status chip
  const getStatusColor = (status) => {
    return status.toLowerCase() === 'open' ? 'success' : 'error';
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://backend-delta-seven-47.vercel.app/api/marker/${_id}/delete`,
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
        <Typography variant="h5" component="div" gutterBottom>
          {title} {verified ? <VerifiedIcon color="primary" /> : <NewReleasesIcon color="error" />}
        </Typography>
        
        <Box sx={{ backgroundColor: '#f3f6f9', borderRadius: 1, padding: 2, marginY: 1 }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Details
          </Typography>
          <Typography variant="body1" component="p" sx={{ whiteSpace: 'pre-wrap' }}>
            {details}
          </Typography>
        </Box>

        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <IconButton color="primary" aria-label="location">
              <RoomIcon />
            </IconButton>
            {geocode[0]}, {geocode[1]}
          </Grid>
          <Grid item>
            <IconButton color="primary" aria-label="email">
              <EmailIcon />
            </IconButton>
            {email}
          </Grid>
          <Grid item>
            <IconButton color="primary" aria-label="phone">
              <PhoneIcon />
            </IconButton>
            {phone}
          </Grid>
          <Grid item>
            <IconButton color="primary" aria-label="calendar">
              <CalendarTodayIcon />
            </IconButton>
            {formatDate(date)} (Created: {formatDate(createdAt)}, Updated: {formatDate(updatedAt)})
          </Grid>
          <Grid item>
            <IconButton color="primary" aria-label="calendar">
              <AssignmentIcon />
            </IconButton>
            {role}
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
          Technologies:
        </Typography>
        {techTags.map((tag, index) => (
          <Tag key={index} color="orange">{tag}</Tag>
        ))}

        <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
          Model Organisms:
        </Typography>
        {modelTags.map((tag, index) => (
          <Tag key={index} color="purple">{tag}</Tag>
        ))}

        <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
          Area(s) of Expertise:
        </Typography>
        {expertiseAreaTags.map((tag, index) => (
          <Tag key={index} color="blue">{tag}</Tag>
        ))}

        <Typography variant="body2" sx={{ mt: 2, mb: 1 , fontWeight: 'bold' }}>
          Visit Status:
        </Typography>
        <Box sx={{ mt: 1, mb: 2 }}>
          <Tag color={getStatusColor(visitStatus)}>{visitStatus}</Tag>
        </Box>
        <Button variant="contained" color="error" startIcon={<DeleteIcon />} sx={{ mt: 1 }} onClick={handleDelete}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default MarkerCardForDeletion;
