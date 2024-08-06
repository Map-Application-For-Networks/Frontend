import { useEffect } from 'react';
import '../App.css';
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

function SearchControl() {
    const map = useMap();
  
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider,
        position: "topleft",
        style: 'button',
        showMarker: false,
        showPopup: false,
        retainZoomLevel: false,
        animateZoom: true,
        autoClose: true,
        searchLabel: 'Please enter the address.',
        keepResult: true,
      });
  
      map.addControl(searchControl);
  
      return () => map.removeControl(searchControl);
    }, [map]);
  
    return null;
  };

  export default SearchControl;