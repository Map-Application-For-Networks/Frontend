import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert, Card, CardContent, Divider,AlertTitle
} from '@mui/material';
import TagIcon from '@mui/icons-material/LocalOffer';
import axios from 'axios';

const AddTag = ({ tagType }) => {
  const [tagName, setTagName] = useState('');
  const [successMessage, setSuccessMessage] = useState(false); // For success confirmation
  const [errorMessage, setErrorMessage] = useState(null); // For error message
  const apiTagType = tagType.replace("tags", "tag");

  const token = localStorage.getItem('token'); // Retrieve token

  let tagTitle = '';

    if (tagType.includes('organism')) {
      tagTitle = 'Organism';
    } else if (tagType.includes('class')) {
      tagTitle = 'Class of exRNA';
    } else if (tagType.includes('carrier')) {
      tagTitle = 'Carrier of exRNA';
    } else if (tagType.includes('application')) {
      tagTitle = 'Application Area';
    } else if (tagType.includes('driven')) {
      tagTitle = 'exRNA-Driven Process';
    } else if (tagType.includes('research')) {
      tagTitle = 'Research Expertise';
    } else if (tagType.includes('technical')) {
      tagTitle = 'Technical Expertise';
    } else {
      tagTitle = 'Tag';}
  
  const handleAddTag = async () => {
    if (!tagName || !tagName.trim()) {
      setErrorMessage("Tag name cannot be empty.");
      return;
    }

    if (!token) {
      setErrorMessage("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        `https://backend-delta-seven-47.vercel.app/api/${apiTagType}`,
        {
          tagName: tagName.trim(),
          verified: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Tag added successfully:", response.data);
      setSuccessMessage(true); // Show success message
      setTagName(""); // Reset input after adding
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to add tag.");
    }
  };

  return (
    <Card
     sx={{ width: '100%', maxWidth: 1000, minWidth: 550, margin: '16px auto', boxShadow: 3, borderRadius: 2 }}
    >
      <Box sx={{ bgcolor: 'success.main', color: 'white', p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <TagIcon />
        <Typography variant="h6">
          Add {tagTitle} Tag
        </Typography>
      </Box>

      <Divider />

      <CardContent sx={{ p: 3 }}>
        <TextField
          fullWidth
          label="Enter Tag Name"
          variant="outlined"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{
            py: 1.5,
            fontSize: '16px',
            textTransform: 'none',
            borderRadius: '8px',
          }}
          onClick={handleAddTag}
        >
          Add Tag
        </Button>
      </CardContent>

      <Snackbar open={successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(false)}>
        <Alert onClose={() => setSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
          <AlertTitle>Success</AlertTitle>
          Tag added successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage(null)}>
        <Alert onClose={() => setErrorMessage(null)} severity="error" sx={{ width: '100%' }}>
        <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default AddTag;
