import './MainPage.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import 'leaflet.locatecontrol';
import 'leaflet-geosearch/dist/geosearch.css';
//import LocateControl from '../../components/LocateControl';
import SearchControl from '../../components/SearchControl';
import { setIconForRole } from '../../components/iconHelper';
import { createOverlayControl } from '../../components/LayerControlUtils';
import SearchComponent from '../../components/SearchComponent';
import { CircularProgress, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { processMarkers } from '../../components/HelperFunctions';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MAIN_VERSION } from '../../components/Version';
import ScrollZoomControl from '../../components/ScrollZoomControl';



const DEFAULT_LATITUDE = 50.32;
const DEFAULT_LONGITUDE = 12.49;
const DEFAULT_ZOOM = 7;
const DEFAULT_URL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

const AddPage = () => {
  const navigate = useNavigate();
  const [markers, setMarkers] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    navigate('/addmarker');
  };

  useEffect(() => {
  Promise.all([
    axios.get('https://backend-delta-seven-47.vercel.app/api/verified-markers'),
    axios.get('https://backend-delta-seven-47.vercel.app/api/roles'),
    axios.get('https://backend-delta-seven-47.vercel.app/api/organismtags'),
    axios.get('https://backend-delta-seven-47.vercel.app/api/drivenprocesstags'),
    axios.get('https://backend-delta-seven-47.vercel.app/api/classofexrnatags'),
    axios.get('https://backend-delta-seven-47.vercel.app/api/carrierofexrnatags'),
    axios.get('https://backend-delta-seven-47.vercel.app/api/applicationareatags'),
    axios.get('https://backend-delta-seven-47.vercel.app/api/researchexpertisetags'),
    axios.get('https://backend-delta-seven-47.vercel.app/api/techexpertisetags')
  ])
    .then(([
      markersResponse,
      rolesResponse,
      organismTagsResponse,
      drivenProcessTagsResponse,
      classOfExrnaTagsResponse,
      carrierOfExrnaTagsResponse,
      applicationAreaTagsResponse,
      researchExpertiseTagsResponse,
      techExpertiseTagsResponse
    ]) => {
      const roles = rolesResponse.data.reduce((acc, role) => {
        acc[role._id] = role.roleName;
        return acc;
      }, {});

      // You can use these if needed in future logic
      const organismTags_list = organismTagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName;
        return acc;
      }, {});

      const drivenProcessTags_list = drivenProcessTagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName;
        return acc;
      }, {});

      const classOfExrnaTags_list = classOfExrnaTagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName;
        return acc;
      }, {});

      const carrierOfExrnaTags_list = carrierOfExrnaTagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName;
        return acc;
      }, {});

      const applicationAreaTags_list = applicationAreaTagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName;
        return acc;
      }, {});

      const researchExpertiseTags_list = researchExpertiseTagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName;
        return acc;
      }, {});

      const techExpertiseTags_list = techExpertiseTagsResponse.data.reduce((acc, tag) => {
        acc[tag._id] = tag.tagName;
        return acc;
      }, {});

      const updatedMarkers = markersResponse.data.map(marker => ({
        ...marker,
        role: roles[marker.role] || marker.role,
        organismTags: Array.isArray(marker.organismTags) ? marker.organismTags.map(tagId => organismTags_list[tagId] || tagId) : [],
        drivenProcessTags: Array.isArray(marker.drivenProcessTags) ? marker.drivenProcessTags.map(tagId => drivenProcessTags_list[tagId] || tagId) : [],
        classOfExrnaTags: Array.isArray(marker.classTags) ? marker.classTags.map(tagId => classOfExrnaTags_list[tagId] || tagId) : [],
        carrierOfExrnaTags: Array.isArray(marker.carrierTags) ? marker.carrierTags.map(tagId => carrierOfExrnaTags_list[tagId] || tagId) : [],
        applicationAreaTags: Array.isArray(marker.applicationAreaTags) ? marker.applicationAreaTags.map(tagId => applicationAreaTags_list[tagId] || tagId) : [],
        researchExpertiseTags: Array.isArray(marker.researchExpertiseTags) ? marker.researchExpertiseTags.map(tagId => researchExpertiseTags_list[tagId] || tagId) : [],
        techExpertiseTags: Array.isArray(marker.technicalExpertiseTags) ? marker.technicalExpertiseTags.map(tagId => techExpertiseTags_list[tagId] || tagId) : []
      }));

      setMarkers(updatedMarkers);
      setRolesList(Object.values(roles));
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
}, []);


  const processedMarkers = processMarkers(markers);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {loading ? (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', height: '100%'
        }}>
          <CircularProgress />
          <Typography variant="h6" style={{ marginTop: '10px' }}>
            Map is loading, please wait...
          </Typography>
        </div>
      ) : (
        <MapContainer center={[DEFAULT_LATITUDE, DEFAULT_LONGITUDE]} zoom={DEFAULT_ZOOM} scrollWheelZoom={false} fullscreenControl >
          <TileLayer
            attribution='&copy; <a href="https://www.carto.com/attributions">CARTO</a>'
            url={DEFAULT_URL}
          />
          <ScrollZoomControl />
          <div>
            <SearchControl />
          </div>
          <SearchComponent markers={processedMarkers} />
          <LayersControl position="bottomright">
            {rolesList.map((role, index) =>
              createOverlayControl(role, processedMarkers, setIconForRole)
            )}
          </LayersControl>
          <div className="float_button" onClick={handleClick}>
          <AddIcon style={{ fontSize: 32 }} /> 
            <span className="float_button_text">Add Entry</span>
          </div>

          <div className="version-label">Network App v{MAIN_VERSION}</div>
        </MapContainer>
      )}
    </div>
  );
};

export default AddPage;