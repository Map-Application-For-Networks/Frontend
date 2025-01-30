import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const AddTag = ({ tagType }) => {
  const [tagName, setTagName] = useState('');
  const [successMessage, setSuccessMessage] = useState(false); // For success confirmation
  const [errorMessage, setErrorMessage] = useState(null); // For error message
  const apiTagType = tagType.replace("tags", "tag");

  const token = localStorage.getItem('token'); // Retrieve token
  
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
    <Box sx={{ p: 3, maxWidth: 400, mx: 'auto', boxShadow: 2, borderRadius: 2, bgcolor: 'white' }}>
      <Typography variant="h6" gutterBottom>
      ADD {tagType.replace(/add/, '').replace(/tags/, '').toUpperCase()} TAG
      </Typography>
      <TextField
        fullWidth
        label="Enter Tag Name"
        variant="outlined"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleAddTag}>
        Add Tag
      </Button>

      {/* Success Message */}
      <Snackbar open={successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(false)}>
        <Alert onClose={() => setSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
          Tag added successfully!
        </Alert>
      </Snackbar>

      {/* Error Message */}
      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage(null)}>
        <Alert onClose={() => setErrorMessage(null)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddTag;
