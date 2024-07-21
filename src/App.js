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
import { Tag } from "antd";
import tastanlabImage from './icons/tastanlab.png';

//<---GLOBAL VARIABLES --->

//Adjusting the coordinates that are shown when the map initialized
var DEFAULT_LATITUDE = 40.89
var DEFAULT_LONGITUDE =  29.37

//Adjusting the zoom when the map initialized
const DEFAULT_ZOOM = 14

//Adjusting the map URL 
const DEFULT_URL = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" // There can be alternative map providers. See the document.

//<---GLOBAL VARIABLES --->

// <---FINDING THE CURRENT LOCATION --->
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
// <---!FINDING THE CURRENT LOCATION --->

//<---ICONS--->
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

//<---!ICONS--->

//<---SETTING ICONS ACCORDING TO ROLES ---> 
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
//<---!SETTING ICONS ACCORDING TO ROLES ---> 

//<---DATA POINTS --->
const markers = [
  {
    geocode: [41.0082, 28.9784],
    details: "Hello, We are researchers and some details. Many other details. Details. Details. Details. Details. Details. Details. Details. Details. Details. Details. Details. Details.",
    title: "Research Topic",
    date: "27.01.2024",
    researchFieldTopic: ["Topic A", "Topic B", "Topic C", "Topic D"],
    visitStatus: "Open",
    role: "Sponsor Company"
  },
  {
    geocode: [41.0138, 28.9497],
    details: "Hello, I am pop up 2, providing insights on our latest developments.",
    title: "Exploratory Research",
    date: "28.01.2024",
    researchFieldTopic: ["Topic E", "Topic F", "Topic G", "Topic H"],
    visitStatus: "Closed",
    role: "Laboratory"
  },
  {
    geocode: [41.0328, 29.0005],
    details: "Hello, I am pop up 3, focusing on innovative technology.",
    title: "Tech Innovations",
    date: "29.01.2024",
    researchFieldTopic: ["Topic I", "Topic J", "Topic K", "Topic L"],
    visitStatus: "Pending",
    role: "Research Facility"
  },
  {
    geocode: [41.0285, 28.9770],
    details: "Hello, I am pop up 4, dedicated to advanced materials research.",
    title: "Materials Science",
    date: "30.01.2024",
    researchFieldTopic: ["Topic M", "Topic N", "Topic O", "Topic P"],
    visitStatus: "Open",
    role: "Sponsor Company"
  },
  {
    geocode: [41.0053, 28.9762],
    details: "Hello, I am pop up 5, here to talk about ecological studies.",
    title: "Ecological Studies",
    date: "31.01.2024",
    researchFieldTopic: ["Topic Q", "Topic R", "Topic S", "Topic T"],
    visitStatus: "Closed",
    role: "Laboratory"
  },
  {
    geocode: [41.0145, 28.9533],
    details: "Hello, I am pop up 6, discussing public health research.",
    title: "Public Health",
    date: "01.02.2024",
    researchFieldTopic: ["Topic U", "Topic V", "Topic W", "Topic X"],
    visitStatus: "Open",
    role: "Research Facility"
  },
  {
    geocode: [41.0110, 28.9980],
    details: "Hello, I am pop up 7, exploring renewable energy solutions.",
    title: "Renewable Energy",
    date: "02.02.2024",
    researchFieldTopic: ["Topic Y", "Topic Z", "Topic AA", "Topic AB"],
    visitStatus: "Open",
    role: "Sponsor Company"
  },
  {
    geocode: [41.0215, 28.9738],
    details: "Hello, I am pop up 8, specializing in archaeological research.",
    title: "Archaeology Research",
    date: "03.02.2024",
    researchFieldTopic: ["Topic AC", "Topic AD", "Topic AE", "Topic AF"],
    visitStatus: "Closed",
    role: "Laboratory"
  },
  {
    geocode: [41.0295, 28.9396],
    details: "Hello, I am pop up 9, focusing on computer science innovations.",
    title: "Computer Science",
    date: "04.02.2024",
    researchFieldTopic: ["Topic AG", "Topic AH", "Topic AI", "Topic AJ"],
    visitStatus: "Pending",
    role: "Research Facility"
  },
  {
    geocode: [41.0351, 28.9853],
    details: "Hello, I am pop up 10, related to space research and technologies.",
    title: "Space Research",
    date: "05.02.2024",
    researchFieldTopic: ["Topic AK", "Topic AL", "Topic AM", "Topic AN"],
    visitStatus: "Open",
    role: "Sponsor Company"
  },
  {
    geocode: [41.0415, 28.9864],
    details: "Hello, I am pop up 11, exploring quantum computing applications.",
    title: "Quantum Computing",
    date: "06.02.2024",
    researchFieldTopic: ["Topic AO", "Topic AP", "Topic AQ", "Topic AR"],
    visitStatus: "Closed",
    role: "Laboratory"
  },
  {
    geocode: [41.0333, 28.9975],
    details: "Hello, I am pop up 12, devoted to automotive innovations.",
    title: "Automotive Innovation",
    date: "07.02.2024",
    researchFieldTopic: ["Topic AS", "Topic AT", "Topic AU", "Topic AV"],
    visitStatus: "Open",
    role: "Research Facility"
  },
  {
    geocode: [41.0287, 29.0044],
    details: "Hello, I am pop up 13, focusing on AI in healthcare.",
    title: "AI in Healthcare",
    date: "08.02.2024",
    researchFieldTopic: ["Topic AW", "Topic AX", "Topic AY", "Topic AZ"],
    visitStatus: "Open",
    role: "Sponsor Company"
  },
  {
    geocode: [41.0188, 28.9642],
    details: "Hello, I am pop up 14, discussing climate change impacts.",
    title: "Climate Change",
    date: "09.02.2024",
    researchFieldTopic: ["Topic BA", "Topic BB", "Topic BC", "Topic BD"],
    visitStatus: "Closed",
    role: "Laboratory"
  },
  {
    geocode: [41.0241, 28.9912],
    details: "Hello, I am pop up 15, dedicated to artificial intelligence research.",
    title: "Artificial Intelligence",
    date: "10.02.2024",
    researchFieldTopic: ["Topic BE", "Topic BF", "Topic BG", "Topic BH"],
    visitStatus: "Pending",
    role: "Research Facility"
  }
];
 // The points can be changed and the API can be implented this part.

//<--!DATA POINTS --->

// <---!CLUSTER POINTS FUNCTIONALITY --->
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

// <---!CLUSTER POINTS FUNCTIONALITY --->

// <--- MAIN DESIGN PART --->
function App() {
  return (
    <MapContainer center={[DEFAULT_LATITUDE, DEFAULT_LONGITUDE]} zoom={DEFAULT_ZOOM}>
      <TileLayer
        attribution='Tiles &copy; Esri'
        url={DEFULT_URL}
      />
      <FullscreenControl />
      <LocateControl />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {/* Mapping through the markers */}
        {
          markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={setIconForRole(marker.role)}>
              <Popup>
              <img src={tastanlabImage} alt="Marker Icon" style={{ width: '300px', height: '150px' }} />

                <h3>{marker.date}</h3>
                <br></br>
                <h2>{marker.title}</h2>
                <p>{marker.details}</p>
                <h2>Research Field / Topic:</h2>
                <br></br>
                <ul>
                  {marker.researchFieldTopic.map((topic, idx) => (
                    <Tag color="blue" key={idx}>{topic}</Tag>
                  ))}
                </ul>
                <strong>Visitor Status: {marker.visitStatus}</strong>
              </Popup>
            </Marker>
          ))
        }
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default App;

