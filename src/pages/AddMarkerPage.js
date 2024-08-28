import React from 'react';
import { TextField} from '@mui/material';
import './AddMarkerPage.css';

const AddPage = () => {
  return (
    <div className="page-container">
      <div className="form-container">
      
        <TextField label="Institution Title" variant="filled" fullWidth />
        <TextField label="Email" variant="filled" type="email" fullWidth />
        <TextField label="Phone Number" variant="filled" type="tel" fullWidth />
        <TextField label="Details" multiline  maxRows={5} rows={5} variant="filled" fullWidth />
        <TextField label="Maps" variant="filled" fullWidth />
      </div>
    </div>
  );
};

export default AddPage;