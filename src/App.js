import { useEffect, useState } from 'react';
import './App.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, LayersControl} from "react-leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import 'leaflet.locatecontrol';
import 'leaflet-geosearch/dist/geosearch.css';
import LocateControl from './components/LocateControl';
import SearchControl from './components/SearchControl';
import MapEventHandler from './components/MapEventHandler';
import CustomPopup from './components/CustomPopup'; 
import { setIconForRole } from './iconHelper';
import { Input } from 'antd';
import { createOverlayControl } from './components/LayerControlUtils';


//<---GLOBAL VARIABLES --->

//Adjusting the coordinates that are shown when the map initialized
var DEFAULT_LATITUDE = 40.89
var DEFAULT_LONGITUDE =  29.37

//Adjusting the zoom when the map initialized
const DEFAULT_ZOOM = 14

//Adjusting the map URL 
const DEFAULT_URL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"//"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" // There can be alternative map providers. See the document.


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
  },
  {
    geocode: [41.3615567, 19.7695770],
    details: "+355689016757 ksulaj@ubt.edu.al",
    title: "Prof Kapllan SULAJ Lab",
    date: "?",
    researchFieldTopic: ["CA21149", "CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [47.7972387, 13.0480985],
    details: `+4366280447257 nicole.meisner-kober@plus.ac.at`,
    title: "Prof Nicole MEISNER-KOBER Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [52.0827240, 5.1782900],
    details: `+31 30 2534336 
    e.n.m.nolte@uu.nl`,
    title: "Dr Esther NOLTE-'T HOEN Lab",
    date: "?",
    researchFieldTopic: ["BM1202", "CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [47.8062600, 13.0329000],
    details: `+435725524501
    e.rohde@salk.at`,
    title: "Prof Eva ROHDE Lab",
    date: "?",
    researchFieldTopic: [ "CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [50.5839266, 5.5666985],
    details: `+38515535118
    luka.bockor@inantro.hr`,
    title: "Dr Johann FAR Lab",
    date: "?",
    researchFieldTopic: ["BM1202", "CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [50.8222329, 4.3969074],
    details: `+32493418445
    guysma9@gmail.com`,
    title: "Prof Guy SMAGGHER Lab",
    date: "?",
    researchFieldTopic: ["CA20110","FA1307","CA18111"," CA15223"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [43.8542197, 18.3946913],
    details: `+387 33 723 768
    llbilela@gmail.com`,
    title: "Prof Lada LUKIĆ BILELA Lab",
    date: "?",
    researchFieldTopic: ["CA20110","CA18238"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [43.8572100, 18.3950740],
    details: `+38733225727
    a.okic@ppf.unsa.ba`,
    title: "Dr Arnela OKIC Lab",
    date: "?",
    researchFieldTopic: ["CA20110","FA1407"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [42.7022924, 23.3360833],
    details: `+35929635411
    kkostov@abi.bg`,
    title: "Dr Kaloyan KOSTOV Lab",
    date: "?",
    researchFieldTopic: ["CA20110","CA18237"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [45.8079406, 15.9761864],
    details: `+38515535118
    luka.bockor@inantro.hr`,
    title: "Dr Luka BOCKOR Lab",
    date: "?",
    researchFieldTopic: ["CA20110","CA21165", "CA21113"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [35.1395182, 33.3735664],
    details: `+35722403124
    dfasoula@ari.moa.gov.cy`,
    title: "Dr Dionysia FASOULA Lab",
    date: "?",
    researchFieldTopic: ["CA20110","FA1306", "CA16212"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [35.1680107, 33.3146209],
    details: `+35722392600
    laphylac@cing.ac.cy`,
    title: "Prof Leonidas PHYLACTOU Lab",
    date: "?",
    researchFieldTopic: ["CA20110","CA17103", "CA15214"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [48.9786844, 14.4482640],
    details: `+420387772342
    mjanda04@prf.jcu.cz`,
    title: "Dr Martin JANDA Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [53.3813502, -1.4884229],
    details: `+441142268345
    a.fazeli@sheffield.ac.uk`,
    title: "Prof Alireza FAZELI Lab",
    date: "?",
    researchFieldTopic: ["CA20110", "861","FA1201","FA0702","CA16119"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [58.3680834, 26.6941396],
    details: `+372 53855802
    ana.rebane@ut.ee`,
    title: "Prof Ana REBANE Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [43.6128510, 7.0777538],
    details: `+33492386464
    stephanie.jaubert@inrae.fr`,
    title: "Dr Stephanie JAUBERT-POSSAMAI Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [48.8420849, 2.3439734],
    details: `0033144322351
    lionel.navarro@ens.fr`,
    title: "Prof Lionel NAVARRO Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [50.1270675, 8.6677635],
    details: `0049 69 6301 84158
    stefan.momma@kgu.de`,
    title: "Dr Stefan MOMMA Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [48.1089712, 11.4575721],
    details: `+49-89-218074731
    a.weiberg@lmu.de`,
    title: "Dr Arne WEIBERG Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [40.5387437, 22.9990282],
    details: `+30 2410231631
    nasosdal@elgo.gr`,
    title: "Dr Athanasios DALAKOURAS Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [35.3073124, 25.0826527],
    details: `+302819394435
    kriton@imbb.forth.gr`,
    title: "Dr Kriton KALANTIDIS Lab",
    date: "?",
    researchFieldTopic: ["CA20110", "CA19125", "CA18111", "CA15223"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [46.2534646, 20.1445632],
    details: `+3612104416
    giricz.zoltan@med.semmelweis-univ.hu`,
    title: "Dr Yotam BAR ON Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [31.9037541, 34.8080315],
    details: `+088943160
    neta.regev-rudzki@weizmann.ac.il`,
    title: "Dr Neta REGEV RUDZKI Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [38.1174347, 13.3700307],
    details: `003909123865717
    riccardo.alessandro@unipa.it`,
    title: "Prof Riccardo ALESSANDRO Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [45.0696528, 7.6890517],
    details: `+390116705969
    luisa.lanfranco@unito.it`,
    title: "Prof Luisa LANFRANCO Lab",
    date: "?",
    researchFieldTopic: ["CA20110", "CA22142"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [49.5041840, 5.9493425],
    details: `+3524666446188
    paul.wilmes@uni.lu`,
    title: "Dr Paul WILMES Lab",
    date: "?",
    researchFieldTopic: ["CA20110", "ES1103", "CA18131"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [46.9809784, 28.8704419],
    details: `+373 69154495
    victoriasacara@hotmail.com`,
    title: "Prof Victoria SACARA Lab",
    date: "?",
    researchFieldTopic: ["CA20110", "CA18139"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [59.6691301, 10.7613695],
    details: `+4792262994
    lene.karine.vestby@vetinst.no`,
    title: "Dr Lene Karine VESTBY Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [63.4148233, 10.4088793],
    details: `+4795991348
    sveneven.borgos@sintef.no`,
    title: "Dr Sven Even BORGOS Lab",
    date: "?",
    researchFieldTopic: ["CA20110", "CA17103"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [50.6690459, 17.9259921],
    details: `48-77-4016010
    tadeusz.janas@uni.opole.pl`,
    title: "Prof Tadeusz JANAS Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [41.1621895, -8.6219537],
    details: `+351 22 041 4859
    lcerqueira@fe.up.pt`,
    title: "Ms Laura CERQUEIRA Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [38.5295253, -8.0180167],
    details: `00351936095222
    pmateratski@uevora.pt`,
    title: "Dr Patrick MATERATSKI Lab",
    date: "?",
    researchFieldTopic: ["CA20110", "CA21134"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [44.4248095, 26.1386675],
    details: `0040723760795
    iulia_iancu2005@yahoo.com`,
    title: "Dr Iulia Virginia IANCU Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [44.4349877, 26.0697220],
    details: `+40731369106
    roscaadelina@gmail.com`,
    title: "Dr Adelina ROSCA Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [44.8206459, 20.4563756],
    details: `+381638214222
    mbrkic@cpn.rs`,
    title: "Dr Marjana BRKIC Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [44.7485961, 20.4932250],
    details: `+381113976414
    dragana.nikolic@imgge.bg.ac.rs`,
    title: "Dr Dragana NIKOLIC Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [46.0493591, 14.4745874],
    details: `+38613203280
    jernej.jakse@bf.uni-lj.si`,
    title: "Dr Jernej JAKSE Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [44.7485961, 20.4932250],
    details: `+38641720766
    veronika.kralj-iglic@fe.uni-lj.si`,
    title: "Prof Veronika KRALJ-IGLIC Lab",
    date: "?",
    researchFieldTopic: ["CA20110", "BM1202"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [37.3646203, 5.9788182],
    details: `0034617507167
    eruizmateos-ibis@us.es`,
    title: "Dr Ezequiel RUIZ-MATEOS Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [40.4588100, -3.8635877],
    details: `(+34) 918223789
    javier.sotillo@isciii.es`,
    title: "Dr Javier SOTILLO GALLEGO Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [46.9936371, 6.9423556],
    details: `+41 (0) 32 718 23 30
    daniel.croll@unine.ch`,
    title: "Prof Daniel CROLL Lab",
    date: "?",
    researchFieldTopic: ["CA20110", "FA1208", "CA19125", "CA16110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [41.0147665, 28.9061039],
    details: `+90 552 939 25 16
    elifkarlik@gmail.com`,
    title: "Dr Elif KARLIK Lab",
    date: "?",
    researchFieldTopic: ["CA20110", "CA21157", "CA21169"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [40.8910054, 29.3783373],
    details: `02164839883
    oznur.tastan@sabanciuniv.edu`,
    title: "Dr Oznur TASTAN Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  },
  {
    geocode: [55.9412083, -3.2053387],
    details: `+447856192225
    cei.abreu@ed.ac.uk`,
    title: "Dr Cei ABREU-GOODGER Lab",
    date: "?",
    researchFieldTopic: ["CA20110"],
    visitStatus: "Pending",
    role: "Laboratory"
  }
];

//This part can be devloped to automaticaly find the unique roles.
const rolesList = ["Research Facility", "Laboratory", "Sponsor Company" ]
// The points can be changed and the API can be implented this part.


//<---Search Feture Will Be Added when the data storage is decided--->
//This search is for lab and researches
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);



// Main Design Part
function App() {
  const [selectedMarker, setSelectedMarker] = useState(null); // This stores the information of the clicked data point.
  const [closedByMapClick, setClosedByMapClick] = useState(false); // This checks the pop up is closed by simply clicking the map. It prevents the error of small size screens showing the closed points. 

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setClosedByMapClick(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (closedByMapClick && window.innerWidth >= 768) {
        setSelectedMarker(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [closedByMapClick]);

  return (
    
    <MapContainer center={[DEFAULT_LATITUDE, DEFAULT_LONGITUDE]} zoom={DEFAULT_ZOOM}>
     
      <TileLayer
        attribution='&copy; <a href="https://www.carto.com/attributions">CARTO</a>'
        url={DEFAULT_URL}
      />
      <FullscreenControl />
      <LocateControl />
      <SearchControl/>
      <Search className="search-container" placeholder="Please enter the research facility or lab name." onSearch={onSearch} enterButton />
      <LayersControl position="bottomright" >
      {rolesList.map((role) =>
        createOverlayControl(role, markers, setIconForRole, handleMarkerClick, selectedMarker, setSelectedMarker, CustomPopup)
      )}
    </LayersControl>
  
      <MapEventHandler setSelectedMarker={setSelectedMarker} setClosedByMapClick={setClosedByMapClick} />
     
    </MapContainer>
  );
}

export default App;
