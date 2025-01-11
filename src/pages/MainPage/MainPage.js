import './MainPage.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, LayersControl} from "react-leaflet";
import  "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import 'leaflet.locatecontrol';
import 'leaflet-geosearch/dist/geosearch.css';
import LocateControl from '../../components/LocateControl';
import SearchControl from '../../components/SearchControl';
import { setIconForRole } from '../../components/iconHelper';
import { createOverlayControl } from '../../components/LayerControlUtils';
import SearchComponent from '../../components/SearchComponent';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {  processMarkers } from '../../components/HelperFunctions';
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



const AddPage = () => {
    const navigate = useNavigate();
    const [markers, setMarkers] = useState([]);
    const [rolesList, setRolesList] = useState([]); 
    const [tagsList, setTagsList] = useState([]);
    const [techTagsList, setTechTagsList] = useState([]);
    const [modelTagsList, setModelTagsList] = useState([]);
    const [expertiseTagList, setExpertiseTagList] = useState([]);
    const handleClick = () => {
      navigate('/addmarker');
    };

    useEffect(() => {
      axios.get('http://localhost:3001/api/roles')
        .then(response => {
          const roles = response.data.map(role => ({
            id: role._id,
            name: role.roleName
          }));
          setRolesList(roles);
        })
        .catch(error => {
          console.error('Error fetching roles:', error);
        });
    }, []);
    
    
    useEffect(() => {
      axios.get('http://localhost:3001/api/techtags') // Assuming you have a similar API endpoint for tags
        .then(response => {
          const tags = response.data.map(tag => ({
            id: tag._id,
            name: tag.tagName
          }));
          setTechTagsList(tags); // Assume you have a state setter for tagsList
        })
        .catch(error => {
          console.error('Error fetching tags:', error);
        });
    }, []);

    useEffect(() => {
      axios.get('http://localhost:3001/api/modeltags') // Assuming you have a similar API endpoint for tags
        .then(response => {
          const tags = response.data.map(tag => ({
            id: tag._id,
            name: tag.tagName
          }));
          setModelTagsList(tags); // Assume you have a state setter for tagsList
        })
        .catch(error => {
          console.error('Error fetching tags:', error);
        });
    }, []);

    useEffect(() => {
      axios.get('http://localhost:3001/api/expertisetags') // Assuming you have a similar API endpoint for tags
        .then(response => {
          const tags = response.data.map(tag => ({
            id: tag._id,
            name: tag.tagName
          }));
          setExpertiseTagList(tags); // Assume you have a state setter for tagsList
        })
        .catch(error => {
          console.error('Error fetching tags:', error);
        });
    }, []);

    useEffect(() => {
      Promise.all([
        axios.get('http://localhost:3001/api/verified-markers'),
        axios.get('http://localhost:3001/api/roles'),
        axios.get('http://localhost:3001/api/techtags'),
        axios.get('http://localhost:3001/api/modeltags'),
        axios.get('http://localhost:3001/api/expertisetags')
      ]).then(([markersResponse, rolesResponse, techTagsResponse, modelTagsResponse, expertiseTagsResponse]) => {
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
          role: roles[marker.role] || marker.role, // Fallback to ID if no matching name
          techTags: Array.isArray(marker.techTags)
            ? marker.techTags.map(tagId => techTags_list[tagId] || tagId)
            : [], // Default to an empty array
          modelTags: Array.isArray(marker.modelTags)
            ? marker.modelTags.map(tagId => modelTags_list[tagId] || tagId)
            : [], // Default to an empty array
            expertiseAreaTags: Array.isArray(marker.expertiseAreaTags)
            ? marker.expertiseAreaTags.map(tagId => expertiseTags_list[tagId] || tagId)
            : [] // Default to an empty array
        }));
        
    
        setMarkers(updatedMarkers);
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    }, []); // Only run once on component mount


    
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
          createOverlayControl(role.name, processedMarkers, setIconForRole )
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