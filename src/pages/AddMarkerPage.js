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

// This part must be automized. I tneeds backend
const tags = ['Topic B', 'CA20440', 'Topic Z', 'Topic BD', 
              'CA20490', 'Topic U', 'Topic AO', 'Topic AI', 
              'CA20640', 'Topic K', 'CA20110', 'Topic AG', 
              'CA15214', 'CA20770', 'Topic A', 'CA20890', 'CA18131', 
              'Topic E', 'Topic BE', 'Topic AN', 'CA20830', 'CA20800', 
              'CA22142', 'CA21134', 'CA20610', 'CA20970', 'CA20910', 'Topic AD', 
              'CA20400', 'Topic BA', 'Topic Y', 'CA20940', 'Topic W', 'Topic J', 
              'CA20900', 'CA21169', 'CA20390', 'CA19125', 'CA21113', 'Topic AR', 
              'CA18237', 'FA1208', 'CA20350', 'CA20580', 'CA20500', 'CA20810', 
              'CA20420', 'Topic AT', 'CA20960', 'Topic H', 'Topic AZ', 'CA21149', 
              'CA18238', 'CA20950', 'FA1407', '861', 'CA17103', 'Topic AK', 'FA1201', 
              'CA20820', 'Topic AC', 'CA16110', 'Topic BH', 'Topic AP', 'Topic AV', 'CA18139', 
              'CA20790', 'Topic AU', 'Topic AA', 'CA16119', 'Topic BG', 'Topic O', 'CA20470', 
              'Topic R', 'Topic S', 'Topic L', 'Topic AM', 'Topic G', 'CA20360', 'CA20780', 'CA20550', 
              'CA20850', 'CA20660', 'CA20840', 'CA16212', 'Topic AJ', 'Topic AY', 'Topic X', 'CA20670', 
              'Topic Q', 'CA20620', 'Topic D', 'CA20880', 'Topic C', 'CA20760', 'CA20870', 'CA21157', 'CA20860', 
              'Topic AH', 'FA0702', 'Topic I', 'Topic AB', 'Topic AX', 'CA20370', 'BM1202', 'CA20720', 'FA1307', 
              'FA1306', 'CA20740', 'CA15223', 'Topic F', 'Topic N', 'CA21165', 'CA18111', 'Topic T', 'Topic BF', 
              'CA20460', 'CA20710', 'CA20590', 'Topic AE', 'CA20750', 'CA20650', 'Topic AL', 'CA20560', 'CA20920', 
              'CA20630', 'CA20730', 'Topic BC', 'Topic BB', 'Topic AQ', 'Topic AW', 'ES1103', 'CA20450', 'CA20980', 
              'CA21000', 'Topic P', 'Topic AF', 'CA20990', 'CA20540', 'Topic V', 'CA20930', 'Topic AS', 'CA20690', 'Topic M']

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

    // Phone number validation: + sign optional, digits only
    const phoneRegex = /^\+?[0-9]*$/;
    // Email validation: must include @ and proper format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!institutionTitle) newErrors.institutionTitle = '*Institution title is required!';
    if (!email) {
      newErrors.email = '*Email is required!ß';
    } else if (!emailRegex.test(email)) {
      newErrors.email = '*Please enter a valid email address!';
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = '*Phone number is required!';
    } else if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = '*Phone number must include only + and digits!';
    }
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
      // This part will be changed according to API behavior.
      navigate('/ConfirmationPage');
    }
  };

  const handleVisitingStatusChange = (event) => {
    setVisitingStatus(event.target.value);
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <Divider textAlign="left">Name of the Institue or Laboratory</Divider>
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
          <Link href="/" underline="hover">LOGIN</Link>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
