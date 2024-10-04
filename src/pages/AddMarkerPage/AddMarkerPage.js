import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import { TextField, Button, Divider, FormControl, InputLabel, MenuItem, Select, FormHelperText, Link, Container } from '@mui/material';
import './AddMarkerPage.css';
import LocateControl from '../../components/LocateControl';
import SearchControl from '../../components/SearchControl';
import { useNavigate } from 'react-router-dom';
import MultipleSelectChip from '../../components/MultipleSelectChip';
import ExRNAIcon from '../../icons/ExRNA_PATH_Logo-3.png'; // Import the image (correct the path if needed)
import { fetchRoles, fetchTags, validateForm } from './Helper';
import axios from 'axios';


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


const AddPage = () => {
  const [institutionTitle, setInstitutionTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [role, setRole] = useState('');
  const [visitingStatus, setVisitingStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [tags, setTags] = useState([]); 
  const [rolesList, setRolesList] = useState([]); 
  const navigate = useNavigate();

 // Fetching tags and roles
 useEffect(() => {
  fetchTags(setTags);
  fetchRoles(setRolesList);
}, []);

const handleClick = () => {
  // Step 1: Validate the form inputs
  const newErrors = validateForm({
    institutionTitle, 
    email, 
    phoneNumber, 
    details, 
    selectedTags, 
    visitingStatus, 
    location, 
    role
  });

  // Step 2: If no validation errors, prepare data and submit it
  if (Object.keys(newErrors).length === 0) {
    
    const geocode = [location.lat, location.lng];
    
    
    const formDataForAPI = {
      title: institutionTitle,       // API expects 'title' for institution title
      email, 
      phone: phoneNumber,            // API expects 'phone' for phone number
      details,
      geocode: geocode,             // API expects 'geocode' for location
      visitStatus: visitingStatus,   // API expects 'visitStatus' for visiting status
      researchFieldTopic: selectedTags,  // API expects 'researchFieldTopic' for selectedTags
      role
    };

    console.log(formDataForAPI)

    // Step 3: Send the data to the API
    axios.post('http://localhost:3001/api/addmarker', formDataForAPI)
      .then(response => {
        // Successfully submitted the marker
        console.log('Marker added successfully:', response.data);
        // Navigate to confirmation page
        console.log(response.data._id);
        navigate('/confirmation', { state: { referenceNumber: response.data._id }});
      })
      .catch(error => {
        // Handle any errors during the API call
        console.error('Error adding marker:', error);
        console.log(location)
      });
  } else {
    // If there are validation errors, set them to display on the form
    setErrors(newErrors);
  }
};



  const handleVisitingStatusChange = (event) => {
    setVisitingStatus(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
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

        <FormControl variant="outlined" fullWidth error={!!errors.role}>
          <InputLabel id="role-label">Role of the Facility</InputLabel>
          <Select
            labelId="role-label"
            value={role}
            onChange={handleRoleChange }
            label="Role of Facility"
          >
            {/* Dynamically rendering the rolesList */}
            {rolesList.map((roleItem) => (
              <MenuItem key={roleItem.value} value={roleItem.value}>
                {roleItem.label}
              </MenuItem>
            ))}
          </Select>
          {errors.role && <FormHelperText error>{errors.role}</FormHelperText>}
        </FormControl>

        <Divider textAlign="left">Visitor Status of the Facility</Divider>
        <FormControl variant="outlined" fullWidth error={!!errors.visitingStatus}>
          <InputLabel id="visiting-status-label">Visiting Status</InputLabel>
          <Select
            labelId="visiting-status-label"
            value={visitingStatus}
            onChange={handleVisitingStatusChange}
            label="Visiting Status"
          >
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="Closed">Close</MenuItem>
          </Select>
          {errors.visitingStatus && <FormHelperText error>{errors.visitingStatus}</FormHelperText>}
        </FormControl>

        <Divider textAlign="left">Location of the Institute or Laboratory</Divider>
        <Container>
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
        </Container>
        {errors.location && <FormHelperText error>{errors.location}</FormHelperText>}
        
        <div className="button-container">
          <Button variant="contained" onClick={handleClick}>Submit</Button>
          <Button variant="outlined" onClick={() => navigate('/')}>Cancel</Button>
        </div>

        <div className="centered-link">
          <Link href="/login" underline="hover">I am the administirator!</Link>
        </div>
      </div>
    </div>
  );
};

export default AddPage;

