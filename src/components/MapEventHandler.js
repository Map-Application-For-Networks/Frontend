import '../App.css';
import "leaflet/dist/leaflet.css";
import {useMapEvents} from "react-leaflet";
import 'leaflet.locatecontrol';


//This function will check whether pop up is closed by clicking to other part of the map. It is essential because it will return the op up element to null.

function MapEventHandler({ setSelectedMarker, setClosedByMapClick }) {
    useMapEvents({
      click() {
        setSelectedMarker(null);
        setClosedByMapClick(true);
      },
    });
    return null;
  };

  export default MapEventHandler;