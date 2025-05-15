import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import { TextField, Button, Divider, FormControl, InputLabel, MenuItem, Select, FormHelperText, Container,CircularProgress, Typography  } from '@mui/material';
import './AddMarkerPage.css';
import LocateControl from '../../components/LocateControl';
import SearchControl from '../../components/SearchControl';
import { useNavigate } from 'react-router-dom';
import MultipleSelectChip from '../../components/MultipleSelectChip';
import ExRNAIcon from '../../icons/ExRNA_PATH_Logo-3.png'; // Import the image (correct the path if needed)
import { fetchDrivenProcessTags, fetchOrganismTags, fetchCarrierOfExrnaTags,fetchClassOfExrnaTags,fetchApplicationAreaTags, fetchResearchExpertiseTags, fetchTechnicalExpertiseTags, fetchRoles, validateForm } from './Helper';
import axios from 'axios';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import TagIcon from '@mui/icons-material/Tag';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';


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

  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});
  const [organismTags, setOrganismTags] = useState([]); 
  const [drivenProcessTags, setDrivenProcessTags] = useState([]); 
  const [classOfExrnaTags, setClassOfExrnaTags] = useState([]); 
  const [carrierOfExrnaTags, setCarrierOfExrnaTags] = useState([]); 
  const [applicationAreaTags, setApplicationAreaTags] = useState([]);
  const [researchExpertiseTags, setResearchExpertiseTags] = useState([]);
  const [technicalExpertiseTags, setTechnicalExpertiseTags] = useState([]);


  const [selectedOrganism, setSelectedOrganism] = useState([]);
  const [selectedDrivenProcess, setSelectedDrivenProcess] = useState([]);
  const [selectedClassOfExrna, setSelectedClassOfExrna] = useState([]);
  const [selectedCarrierOfExrna, setSelectedCarrierOfExrna] = useState([]);
  const [selectedApplicationArea, setSelectedApplicationArea] = useState([]);
  const [selectedResearchExpertise, setSelectedResearchExpertise] = useState([]);
  const [selectedTechnicalExpertise, setSelectedTechnicalExpertise] = useState([]);

  const [rolesList, setRolesList] = useState([]); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


useEffect(() => {
  fetchOrganismTags(setOrganismTags);
  fetchDrivenProcessTags(setDrivenProcessTags)
  fetchClassOfExrnaTags(setClassOfExrnaTags)
  fetchCarrierOfExrnaTags(setCarrierOfExrnaTags)
  fetchApplicationAreaTags(setApplicationAreaTags)
  fetchResearchExpertiseTags(setResearchExpertiseTags)
  fetchTechnicalExpertiseTags(setTechnicalExpertiseTags)
  fetchRoles(setRolesList);
}, []);



const handleClick = () => {
  // Step 1: Validate the form inputs
  const newErrors = validateForm({
    institutionTitle, 
    email, 
    phoneNumber, 
    details,  
    location, 
    role,
    selectedOrganism,
    selectedDrivenProcess,
    selectedClassOfExrna,
    selectedCarrierOfExrna,
    selectedApplicationArea,
    selectedResearchExpertise,
    selectedTechnicalExpertise
  });

  //console.log(newErrors); // Debugging validation errors

  // Step 2: If no validation errors, prepare data and submit it
  if (Object.keys(newErrors).length === 0) {
    setLoading(true);
    const geocode = [location.lat, location.lng];
    
    
    const formDataForAPI = {
      title: institutionTitle,       // API expects 'title' for institution title
      email, 
      phone: phoneNumber,            // API expects 'phone' for phone number
      details,
      geocode: geocode,             // API expects 'geocode' for location
      //researchFieldTopic: selectedTags,  // API expects 'researchFieldTopic' for selectedTags
      //expertiseAreaTags: selectedAreasOfExpertise,
      //techTags: selectedTechnologies,
      //modelTags: selectedModelOrganisms,
      organismTags:selectedOrganism,
      drivenProcessTags:selectedDrivenProcess,
      classTags:selectedClassOfExrna,
      carrierTags:selectedCarrierOfExrna,
      applicationAreaTags:selectedApplicationArea,
      researchExpertiseTags:selectedResearchExpertise,
      technicalExpertiseTags:selectedTechnicalExpertise,
      role:role
    };

    //console.log(formDataForAPI)

    // Step 3: Send the data to the API
    axios.post('https://backend-delta-seven-47.vercel.app/api/addmarker', formDataForAPI)
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
      })
      .finally(() => {
        setLoading(false);
      });
  } else {
    // If there are validation errors, set them to display on the form
    setErrors(newErrors);
  }
};


  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {loading ? (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', height: '100%'
        }}>
          <CircularProgress />
          <Typography variant="h6" style={{ marginTop: '10px' }}>
            Marker is uploading to the system, please wait...
          </Typography>
        </div>
      ) : (
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
        <FormControl fullWidth error={!!errors.selectedOrganism} >
          <MultipleSelectChip
            label="Organism" 
            tags={organismTags} 
            selectedTags={selectedOrganism} 
            setSelectedTags={setSelectedOrganism} 
          />
          {errors.selectedOrganism && <FormHelperText error>{errors.selectedOrganism}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth error={!!errors.selectedDrivenProcess} >
          <MultipleSelectChip
            label="exRNA-Driven Process" 
            tags={drivenProcessTags} 
            selectedTags={selectedDrivenProcess} 
            setSelectedTags={setSelectedDrivenProcess} 
          />
          {errors.selectedDrivenProcess && <FormHelperText error>{errors.selectedDrivenProcess}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth error={!!errors.selectedClassOfExrna} >
          <MultipleSelectChip
            label="Class of exRNA" 
            tags={classOfExrnaTags} 
            selectedTags={selectedClassOfExrna} 
            setSelectedTags={setSelectedClassOfExrna} 
          />
          {errors.selectedClassOfExrna && <FormHelperText error>{errors.selectedClassOfExrna}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth error={!!errors.selectedCarrierOfExrna} >
          <MultipleSelectChip
            label="Carrier of exRNA" 
            tags={carrierOfExrnaTags} 
            selectedTags={selectedCarrierOfExrna} 
            setSelectedTags={setSelectedCarrierOfExrna} 
          />
          {errors.selectedCarrierOfExrna && <FormHelperText error>{errors.selectedCarrierOfExrna}</FormHelperText>}
        </FormControl>
          
        <FormControl fullWidth error={!!errors.selectedApplicationArea} >
          <MultipleSelectChip
            label="Application Area" 
            tags={applicationAreaTags} 
            selectedTags={selectedApplicationArea} 
            setSelectedTags={setSelectedApplicationArea} 
          />
          {errors.selectedApplicationArea && <FormHelperText error>{errors.selectedApplicationArea}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth error={!!errors.selectedResearchExpertise} >
          <MultipleSelectChip
            label="Research Expertise" 
            tags={researchExpertiseTags} 
            selectedTags={selectedResearchExpertise} 
            setSelectedTags={setSelectedResearchExpertise} 
          />
          {errors.selectedResearchExpertise && <FormHelperText error>{errors.selectedResearchExpertise}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth error={!!errors.selectedTechnicalExpertise} >
          <MultipleSelectChip
            label="Technical Expertise" 
            tags={technicalExpertiseTags} 
            selectedTags={selectedTechnicalExpertise} 
            setSelectedTags={setSelectedTechnicalExpertise} 
          />
          {errors.selectedTechnicalExpertise && <FormHelperText error>{errors.selectedTechnicalExpertise}</FormHelperText>}
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
          <Button startIcon={<SendIcon/>} variant="contained"  color="success" onClick={handleClick}>Submit</Button>
          <Button startIcon={<CancelIcon/>} variant="outlined" color="error" onClick={() => navigate('/')}>Cancel</Button>
        </div>

       <Divider variant="middle" sx={{ my: 3, borderStyle: 'dashed', opacity: 1 }} />

        {/* Admin Login (semantic navigation) */}
        
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<AdminPanelSettingsIcon />}
            onClick={() => navigate('/login')}
            sx={{ fontSize: '0.75rem', px: 3, py: 1.5 }}
          >
            Admin Login
          </Button>
        

        {/* Suggest Tags (semantic navigation) */}

          <Button
            fullWidth
            variant="outlined"
            color="info"
            startIcon={<TagIcon />}
            sx={{ fontSize: '0.75rem', px: 3, py: 1.5 }}
          >
            Suggest Tags
          </Button>
        
      </div>
    </div>)}
  </div> 
  );
};

export default AddPage;
