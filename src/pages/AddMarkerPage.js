import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import { TextField, Button, Divider, FormControl, InputLabel, MenuItem, Select, FormHelperText, Link } from '@mui/material';
import './AddMarkerPage.css';
import LocateControl from '../components/LocateControl';
import SearchControl from '../components/SearchControl';
import { useNavigate } from 'react-router-dom';
import MultipleSelectChip from '../components/MultipleSelectChip';
import ExRNAIcon from '../icons/ExRNA_PATH_Logo-3.png'; // Import the image (correct the path if needed)

const DEFAULT_LATITUDE = 40.89;
const DEFAULT_LONGITUDE = 29.37;
const DEFAULT_ZOOM = 14;
const DEFAULT_URL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

const defaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconAnchor: [12, 41],
  iconSize: [25, 41],
  shadowSize: [41, 41],
});

const LocationMarker = ({ setLocation }) => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLocation(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={defaultIcon}></Marker>
  );
};

const tags = ['Topic B', 'CA20440', 'Topic Z', 'Topic BD', 'CA20490', 'Topic U', 'Topic AO', 'Topic AI'];

const AddPage = () => {
  const [institutionTitle, setInstitutionTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [visitingStatus, setVisitingStatus] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    const phoneRegex = /^\+?[0-9]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!institutionTitle) newErrors.institutionTitle = '*Institution title is required!';
    if (!email) newErrors.email = '*Email is required!';
    else if (!emailRegex.test(email)) newErrors.email = '*Please enter a valid email address!';
    
    if (!phoneNumber) newErrors.phoneNumber = '*Phone number is required!';
    else if (!phoneRegex.test(phoneNumber)) newErrors.phoneNumber = '*Phone number must include only + and digits!';
    
    if (!details) newErrors.details = '*Details are required!';
    if (selectedTags.length === 0) newErrors.selectedTags = '*At least one research area must be selected!';
    if (!visitingStatus) newErrors.visitingStatus = '*Visiting status is required!';
    if (!location) newErrors.location = '*Location must be selected!';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClick = () => {
    if (validateForm()) {
      const formData = {
        institutionTitle,
        email,
        phoneNumber,
        details,
        location,
        visitingStatus,
        selectedTags,
      };
      console.log('Form Data Submitted:', formData);
      navigate('/ConfirmationPage');
    }
  };

  const handleVisitingStatusChange = (event) => {
    setVisitingStatus(event.target.value);
  };

  return (
    <div className="page-container">
      <div className="form-container">
        {/* Adding the logo at the top */}
        <img src={ExRNAIcon} alt="ExRNA PATH Logo" className="form-logo" />

        <Divider textAlign="left">Name of the Institute or Laboratory</Divider>
        <TextField 
          label="Institution Title" 
          variant="outlined" 
          fullWidth 
          value={institutionTitle}
          onChange={(e) => setInstitutionTitle(e.target.value)}
          error={!!errors.institutionTitle}
          helperText={errors.institutionTitle}
        />

        <Divider textAlign="left">Contact Information</Divider>
        <TextField 
          label="Email" 
          variant="outlined" 
          type="email" 
          fullWidth 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField 
          label="Phone Number" 
          variant="outlined" 
          type="tel" 
          fullWidth 
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
        />

        <Divider textAlign="left">Details About the Laboratory</Divider>
        <TextField 
          label="Details" 
          multiline 
          maxRows={5} 
          rows={5} 
          variant="outlined" 
          fullWidth 
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          error={!!errors.details}
          helperText={errors.details}
        />

        <MultipleSelectChip 
          tags={tags} 
          selectedTags={selectedTags} 
          setSelectedTags={setSelectedTags} 
        />
        {errors.selectedTags && <FormHelperText error>{errors.selectedTags}</FormHelperText>}

        <Divider textAlign="left">Visitor Status of the Facility</Divider>
        <FormControl variant="outlined" fullWidth error={!!errors.visitingStatus}>
          <InputLabel id="visiting-status-label">Visiting Status</InputLabel>
          <Select
            labelId="visiting-status-label"
            value={visitingStatus}
            onChange={handleVisitingStatusChange}
            label="Visiting Status"
          >
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="close">Close</MenuItem>
          </Select>
          {errors.visitingStatus && <FormHelperText error>{errors.visitingStatus}</FormHelperText>}
        </FormControl>

        <Divider textAlign="left">Location of the Institute or Laboratory</Divider>
        <MapContainer center={[DEFAULT_LATITUDE, DEFAULT_LONGITUDE]} zoom={DEFAULT_ZOOM} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.carto.com/attributions">CARTO</a>'
            url={DEFAULT_URL}
          />
          <div>
            <LocateControl />
            <SearchControl/>
          </div>
          <LocationMarker setLocation={setLocation} />
        </MapContainer>
        {errors.location && <FormHelperText error>{errors.location}</FormHelperText>}
        
        <div className="button-container">
          <Button variant="contained" onClick={handleClick}>Submit</Button>
          <Button variant="outlined" onClick={() => navigate('/')}>Cancel</Button>
        </div>

        <div className="centered-link">
          <Link href="/" underline="hover">I am the administirator!</Link>
        </div>
      </div>
    </div>
  );
};

export default AddPage;

