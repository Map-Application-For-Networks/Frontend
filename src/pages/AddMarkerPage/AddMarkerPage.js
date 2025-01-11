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
import { fetchExpertiseAreaTags, fetchModelTags, fetchRoles, fetchTechTags, validateForm } from './Helper';
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
  const [selectedAreasOfExpertise, setSelectedAreasOfExpertise] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [selectedModelOrganisms, setSelectedModelOrganisms] = useState([]);
  const [role, setRole] = useState('');
  const [visitingStatus, setVisitingStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [areaTags, setAreaTags] = useState([]); 
  const [technologyTags, setTechnologTags] = useState([]); 
  const [organismTags, setOrganismTags] = useState([]); 
  const [rolesList, setRolesList] = useState([]); 
  const navigate = useNavigate();


useEffect(() => {
  fetchExpertiseAreaTags(setAreaTags);
  fetchTechTags(setTechnologTags);
  fetchModelTags(setOrganismTags);
  fetchRoles(setRolesList);
}, []);



const handleClick = () => {
  // Step 1: Validate the form inputs
  const newErrors = validateForm({
    institutionTitle, 
    email, 
    phoneNumber, 
    details, 
    visitingStatus, 
    location, 
    role,
    selectedAreasOfExpertise,
    selectedTechnologies,
    selectedModelOrganisms

  });

  console.log(newErrors); // Debugging validation errors

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
      //researchFieldTopic: selectedTags,  // API expects 'researchFieldTopic' for selectedTags
      expertiseAreaTags: selectedAreasOfExpertise,
      techTags: selectedTechnologies,
      modelTags: selectedModelOrganisms,
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

        <Divider textAlign="left" style={{ fontWeight: 'bold' }}>Name of the Institute or Laboratory</Divider>
        <TextField 
          label="Institution Title" 
          variant="outlined" 
          fullWidth 
          value={institutionTitle}
          onChange={(e) => setInstitutionTitle(e.target.value)}
          error={!!errors.institutionTitle}
          helperText={errors.institutionTitle}
        />

        <Divider textAlign="left" style={{ fontWeight: 'bold' }}>Contact Information</Divider>
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
          label="Phone Number (Optional)" 
          variant="outlined" 
          type="tel" 
          fullWidth 
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
        />

        <Divider textAlign="left" style={{ fontWeight: 'bold' }}>Details About the Laboratory</Divider>
        <TextField 
          label="Details (Max. 500 characters)" 
          multiline 
          maxRows={5} 
          rows={5} 
          variant="outlined" 
          fullWidth 
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          error={!!errors.details || details.length > 500}
          helperText={errors.details || `${details.length}/500`} // Show character count
        />
       
       <FormControl  fullWidth error={!!errors.role}>
          <InputLabel id="role-label">Role of Facility</InputLabel>
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

        <Divider textAlign="left" style={{ fontWeight: 'bold' }}>Details About Research</Divider>
        <FormControl fullWidth error={!!errors.selectedAreasOfExpertise} >
          <MultipleSelectChip
            label="Area(s) of Expertise" 
            tags={areaTags} 
            selectedTags={selectedAreasOfExpertise} 
            setSelectedTags={setSelectedAreasOfExpertise} 
          />
          {errors.selectedAreasOfExpertise && <FormHelperText error>{errors.selectedAreasOfExpertise}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth error={!!errors.selectedTechnologies} >
          <MultipleSelectChip 
            label="Technology(s)"
            tags={technologyTags} 
            selectedTags={selectedTechnologies} 
            setSelectedTags={setSelectedTechnologies} 
          />
          {errors.selectedTechnologies && <FormHelperText error>{errors.selectedTechnologies}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth error={!!errors.selectedModelOrganisms} >
          <MultipleSelectChip 
            label="Model Organism"
            tags={organismTags} 
            selectedTags={selectedModelOrganisms} 
            setSelectedTags={setSelectedModelOrganisms} 
          />
          {errors.selectedModelOrganisms && <FormHelperText error>{errors.selectedModelOrganisms}</FormHelperText>}
        </FormControl>

        <Divider textAlign="left" style={{ fontWeight: 'bold' }}>Visitor Status of the Facility</Divider>
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

        <Divider textAlign="left" style={{ fontWeight: 'bold' }}>Location of the Institute or Laboratory</Divider>
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

