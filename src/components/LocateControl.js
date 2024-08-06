import { useEffect } from 'react';
import '../App.css';
import "leaflet/dist/leaflet.css";
import { useMap} from "react-leaflet";
import "react-leaflet-fullscreen/styles.css";
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import L from 'leaflet';
import 'leaflet.locatecontrol';
import 'leaflet-geosearch/dist/geosearch.css';

// <---FINDING THE CURRENT LOCATION --->
function LocateControl() {
    const map = useMap();
  
    useEffect(() => {
      // This ensures the control is only added once
      const locator = L.control.locate({
        position: 'topleft',
        flyTo: true,
        keepCurrentZoomLevel: true,
        showPopup: false,
        locateOptions: {
          enableHighAccuracy: true,
        },
      });
  
      locator.addTo(map);
      
  
      // Cleanup function to remove the control when the component unmounts
      return () => {
        locator.remove();
      };
    }, [map]);  // Ensures effect runs only once when the map instance is available
  
    return null;
  };
  export default LocateControl;

  // <---!FINDING THE CURRENT LOCATION --->
