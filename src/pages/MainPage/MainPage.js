import './MainPage.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import 'leaflet.locatecontrol';
import 'leaflet-geosearch/dist/geosearch.css';
import LocateControl from '../../components/LocateControl';
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


const DEFAULT_LATITUDE = 40.89;
const DEFAULT_LONGITUDE = 29.37;
const DEFAULT_ZOOM = 14;
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
      axios.get('https://backend-delta-seven-47.vercel.app/api/techtags'),
      axios.get('https://backend-delta-seven-47.vercel.app/api/modeltags'),
      axios.get('https://backend-delta-seven-47.vercel.app/api/expertisetags')
    ])
      .then(([markersResponse, rolesResponse, techTagsResponse, modelTagsResponse, expertiseTagsResponse]) => {
        const roles = rolesResponse.data.reduce((acc, role) => {
          acc[role._id] = role.roleName;
          return acc;
        }, {});

        const techTags_list = techTagsResponse.data.reduce((acc, tag) => {
          acc[tag._id] = tag.tagName;
          return acc;
        }, {});

        const modelTags_list = modelTagsResponse.data.reduce((acc, tag) => {
          acc[tag._id] = tag.tagName;
          return acc;
        }, {});

        const expertiseTags_list = expertiseTagsResponse.data.reduce((acc, tag) => {
          acc[tag._id] = tag.tagName;
          return acc;
        }, {});

        const updatedMarkers = markersResponse.data.map(marker => ({
          ...marker,
          role: roles[marker.role] || marker.role,
          techTags: Array.isArray(marker.techTags) ? marker.techTags.map(tagId => techTags_list[tagId] || tagId) : [],
          modelTags: Array.isArray(marker.modelTags) ? marker.modelTags.map(tagId => modelTags_list[tagId] || tagId) : [],
          expertiseAreaTags: Array.isArray(marker.expertiseAreaTags) ? marker.expertiseAreaTags.map(tagId => expertiseTags_list[tagId] || tagId) : []
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
        <MapContainer center={[DEFAULT_LATITUDE, DEFAULT_LONGITUDE]} zoom={DEFAULT_ZOOM} fullscreenControl>
          <TileLayer
            attribution='&copy; <a href="https://www.carto.com/attributions">CARTO</a>'
            url={DEFAULT_URL}
          />
          <div>
            <LocateControl />
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
            <span className="float_button_text">Add Marker</span>
          </div>

          <div className="version-label">Network App v{MAIN_VERSION}</div>
        </MapContainer>
      )}
    </div>
  );
};

export default AddPage;