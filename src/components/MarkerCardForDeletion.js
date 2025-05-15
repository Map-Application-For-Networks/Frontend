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
  const { _id ,title, details, geocode, email, phone, verified, date, createdAt, updatedAt,  organismTags,
    drivenProcessTags,
    classTags,
    carrierTags,
    applicationAreaTags,
    researchExpertiseTags,
    technicalExpertiseTags, role } = marker;

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
    <Card sx={{ width: '100%', maxWidth: 1000, minWidth: 275, margin: '16px auto', boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title} {verified ? <VerifiedIcon color="primary" /> : <NewReleasesIcon color="error" />}
        </Typography>
        
        <Box sx={{ backgroundColor: '#f3f6f9', borderRadius: 2, padding: 2, marginY: 1 }}>
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
                 Organisms:
               </Typography>
               {organismTags?.map((tag, index) => (
                 <Tag key={`organism-${index}`} color="blue">{tag}</Tag>
               ))}
       
               <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
                 exRNA-Driven Process:
               </Typography>
               {drivenProcessTags?.map((tag, index) => (
                 <Tag key={`driven-${index}`} color="orange">{tag}</Tag>
               ))}
       
               <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
                 Class of exRNA:
               </Typography>
               {classTags?.map((tag, index) => (
                 <Tag key={`class-${index}`} color="purple">{tag}</Tag>
               ))}
       
               <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
                 Carrier of exRNA:
               </Typography>
               {carrierTags?.map((tag, index) => (
                 <Tag key={`carrier-${index}`} color="green">{tag}</Tag>
               ))}
       
               <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
                 Application Area:
               </Typography>
               {applicationAreaTags?.map((tag, index) => (
                 <Tag key={`apparea-${index}`} color="gold">{tag}</Tag>
               ))}
       
               <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
                 Research Expertise:
               </Typography>
               {researchExpertiseTags?.map((tag, index) => (
                 <Tag key={`research-${index}`} color="cyan">{tag}</Tag>
               ))}
       
               <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
                 Technical Expertise:
               </Typography>
               {technicalExpertiseTags?.map((tag, index) => (
                 <Tag key={`techx-${index}`} color="volcano">{tag}</Tag>
               ))}

       <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="error" startIcon={<DeleteIcon />} sx={{ mt: 1 }} onClick={handleDelete}>
          Delete
        </Button>
      </Box>
      </CardContent>
    </Card>
  );
};

export default MarkerCardForDeletion;
