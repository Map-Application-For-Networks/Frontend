import React, { useEffect, useState } from 'react';
import {
  Box, List, ListItem, ListItemText, IconButton, Typography,
  CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Button, Card, CardContent, Divider,Snackbar, AlertTitle,
    Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import LabelOffIcon from '@mui/icons-material/LabelOff';
import axios from 'axios';

const DeleteTag = ({ tagType }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);


  const apiTagType = tagType.replace('add', '');
  const token = localStorage.getItem('token'); // Retrieve token

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`https://backend-delta-seven-47.vercel.app/api/${apiTagType}`);
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [apiTagType]); //tagType

  const handleOpenDialog = (tag) => {
    if (tag.tagName.trim().toUpperCase() === 'NULL') {
      alert("The 'NULL' tag cannot be deleted.");
      return;
    }
    setSelectedTag(tag);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTag(null);
  };

  const handleDeleteTag = async () => {
    if (!selectedTag) return;

    try {
      await axios.delete(`http://localhost:3001/api/${apiTagType}/${selectedTag._id}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTags((prevTags) => prevTags.filter((tag) => tag._id !== selectedTag._id));
      setSuccessMessage(true); // Show success feedback
    } catch (error) {
      console.error('Error deleting tag:', error);
    } finally {
      handleCloseDialog();
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        minWidth:400,
        mx: 'auto',
        mt: 5,
        boxShadow: 6,
        borderRadius: 2,
        bgcolor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ bgcolor: 'error.main', color: 'white', p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <LabelOffIcon />
        <Typography variant="h6">
          Delete {tagType.replace(/add/, '').replace(/tags/, '').toUpperCase()} Tags
        </Typography>
      </Box>

      <Divider />

      <CardContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List >
            {tags.map((tag) => (
              <ListItem
                key={tag._id}
                sx={{
                  borderBottom: '1px solid #eee',
                  '&:hover': { backgroundColor: '#f9f9f9' },
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleOpenDialog(tag)}
                    disabled={tag.tagName.trim().toUpperCase() === 'NULL'}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={tag.tagName} />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, borderRadius: 2 }}>
          <WarningIcon color="error" />
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the tag <strong>{selectedTag?.tagName}</strong>?
            This action cannot be undone. All markers using this tag will be affected.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDeleteTag} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage(false)}
      >
        <Alert
          onClose={() => setSuccessMessage(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          <AlertTitle>Success</AlertTitle>
          Tag deleted successfully!
        </Alert>
      </Snackbar>

    </Card>
  );
};

export default DeleteTag;