import { useEffect } from 'react';
import './App.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";
import { Icon, divIcon, point } from "leaflet";
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import L from 'leaflet';
import 'leaflet.locatecontrol';

function LocateControl() {
  const map = useMap();

  useEffect(() => {
    // This ensures the control is only added once
    const locator = L.control.locate({
      position: 'topleft',
      flyTo: true,
      keepCurrentZoomLevel: true,
      showPopup: true,
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
}


var DEFAULT_LATITUDE = 40.89
var DEFAULT_LONGITUDE =  29.37

const laboratoryIcon = new Icon({
  iconSize: [50,50],
  iconUrl: require("./icons/Laboratory.png"),
});

const ResearchFacilityIcon = new Icon({
  iconSize: [50,50],
  iconUrl: require("./icons/ResearchFacility.png"),
});

const sponsorCompanyIcon = new Icon({
  iconSize: [50,50],
  iconUrl: require("./icons/SponsorCompany.png"),
});

const setIconForRole = (role) => {
  if (role === "Sponsor Company") 
  {
    return laboratoryIcon;
  } 
  else if (role === "Laboratory") 
  {
    return ResearchFacilityIcon;
  } 
  else if (role === "Research Facility") 
  {
    return sponsorCompanyIcon;
  } 
  
};


const markers = [
  {
    geocode: [41.0082, 28.9784],
    popUp: "Hello, I am pop up 1",
    role: "Sponsor Company"
  },
  {
    geocode: [41.0138, 28.9497],
    popUp: "Hello, I am pop up 2",
    role: "Laboratory"
  },
  {
    geocode: [41.0328, 29.0005],
    popUp: "Hello, I am pop up 3",
    role: "Research Facility"
  },
  {
    geocode: [41.0285, 28.9770],
    popUp: "Hello, I am pop up 4",
    role: "Sponsor Company"
  },
  {
    geocode: [41.0053, 28.9762],
    popUp: "Hello, I am pop up 5",
    role: "Laboratory"
  },
  {
    geocode: [41.0145, 28.9533],
    popUp: "Hello, I am pop up 6",
    role: "Research Facility"
  },
  {
    geocode: [41.0110, 28.9980],
    popUp: "Hello, I am pop up 7",
    role: "Sponsor Company"
  },
  {
    geocode: [41.0215, 28.9738],
    popUp: "Hello, I am pop up 8",
    role: "Laboratory"
  },
  {
    geocode: [41.0295, 28.9396],
    popUp: "Hello, I am pop up 9",
    role: "Research Facility"
  },
  {
    geocode: [41.0351, 28.9853],
    popUp: "Hello, I am pop up 10",
    role: "Sponsor Company"
  },
  {
    geocode: [41.0415, 28.9864],
    popUp: "Hello, I am pop up 11",
    role: "Laboratory"
  },
  {
    geocode: [41.0333, 28.9975],
    popUp: "Hello, I am pop up 12",
    role: "Research Facility"
  },
  {
    geocode: [41.0287, 29.0044],
    popUp: "Hello, I am pop up 13",
    role: "Sponsor Company"
  },
  {
    geocode: [41.0188, 28.9642],
    popUp: "Hello, I am pop up 14",
    role: "Laboratory"
  },
  {
    geocode: [41.0241, 28.9912],
    popUp: "Hello, I am pop up 15",
    role: "Research Facility"
  }
];

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

function App() {
  return (
    <MapContainer center = {[DEFAULT_LATITUDE, DEFAULT_LONGITUDE]} zoom = {14} fullscreenControlOptions = {"left"} >
        {/*Several maps API can be implemented. Please see the example file docs.*/}
       
        <TileLayer
          attribution='Tiles &copy; Esri'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        />
        <FullscreenControl />
        <LocateControl />
        <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {/* Mapping through the markers */}
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={setIconForRole(marker.role)}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
export default App;

