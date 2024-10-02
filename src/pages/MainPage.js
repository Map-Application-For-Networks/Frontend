import './MainPage.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, LayersControl} from "react-leaflet";
import  "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import 'leaflet.locatecontrol';
import 'leaflet-geosearch/dist/geosearch.css';
import LocateControl from '../components/LocateControl';
import SearchControl from '../components/SearchControl';
import { setIconForRole } from '../components/iconHelper';
import { createOverlayControl } from '../components/LayerControlUtils';
import SearchComponent from '../components/SearchComponent';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {  processMarkers } from '../components/HelperFunctions';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios


//<---GLOBAL VARIABLES --->

//Adjusting the coordinates that are shown when the map initialized
var DEFAULT_LATITUDE = 40.89
var DEFAULT_LONGITUDE =  29.37

//Adjusting the zoom when the map initialized
const DEFAULT_ZOOM = 14

//Adjusting the map URL 
const DEFAULT_URL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"//"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" // There can be alternative map providers. See the document.




//This part can be devloped to automaticaly find the unique roles.
// The points can be changed and the API can be implented this part.




const AddPage = () => {
    const navigate = useNavigate();
    const [markers, setMarkers] = useState([]);
    const [rolesList, setRolesList] = useState([]); // State to hold the roles
    const handleClick = () => {
      navigate('/addmarker');
    };

    useEffect(() => {
      axios.get('http://localhost:3001/api/roles')
        .then(response => {
          const roles = response.data.map(role => role.roleName);
          setRolesList(roles);
        })
        .catch(error => {
          console.error('Error fetching roles:', error);
        });
    }, []);
    
    useEffect(() => {
      axios.get('http://localhost:3001/api/verified-markers')
        .then(response => {
          setMarkers(response.data);
        })
        .catch(error => {
          console.error('Error fetching markers:', error);
        });
    }, []);

    
    //Markers with offset
    const processedMarkers = processMarkers(markers);
  
  return (
    <MapContainer center={[DEFAULT_LATITUDE, DEFAULT_LONGITUDE]} zoom={DEFAULT_ZOOM} fullscreenControl>
     
      <TileLayer
        attribution='&copy; <a href="https://www.carto.com/attributions">CARTO</a>'
        url={DEFAULT_URL}
      />
      <div>
      <LocateControl />
      <SearchControl/>
      </div>

      <SearchComponent markers={processedMarkers}  />
        <LayersControl position="bottomright" >
        {rolesList.map((role) =>
          createOverlayControl(role, processedMarkers, setIconForRole )
        )}
        </LayersControl>
        <div className="float_button">
            <Fab color="primary" aria-label="add"  onClick={handleClick} >
                <AddIcon />
            </Fab>
        </div>
    </MapContainer> 
  );
};

export default AddPage;