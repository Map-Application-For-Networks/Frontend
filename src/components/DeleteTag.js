import React, { useEffect, useState } from 'react';
import { 
  Box, List, ListItem, ListItemText, IconButton, Typography, 
  CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, 
  DialogTitle, Button 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import axios from 'axios';

const DeleteTag = ({ tagType }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

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
  }, [tagType]);

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
      await axios.delete(`https://backend-delta-seven-47.vercel.app/api/${apiTagType}/${selectedTag._id}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTags((prevTags) => prevTags.filter((tag) => tag._id !== selectedTag._id));
    } catch (error) {
      console.error('Error deleting tag:', error);
    } finally {
      handleCloseDialog();
    }
  };

  return (
    <Box sx={{ p: 3, minWidth: 275, mx: 'auto', boxShadow: 2, margin: 2, borderRadius: 2, bgcolor: 'white' }}> 
      <Typography variant="h6" gutterBottom>
        DELETE {tagType.replace(/add/, '').replace(/tags/, '').toUpperCase()} TAG
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {tags.map((tag) => (
            <ListItem key={tag._id} sx={{ borderBottom: '1px solid #eee' }}>
              <ListItemText primary={tag.tagName} />
              <IconButton 
                color="error" 
                onClick={() => handleOpenDialog(tag)} 
                disabled={tag.tagName.trim().toUpperCase() === 'NULL'}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          <WarningIcon color="error" sx={{ verticalAlign: 'middle', mr: 1 }} />
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the tag <strong>{selectedTag?.tagName}</strong>?
            This action cannot be undone. All the markers with this tag will be affected.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteTag} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteTag;
