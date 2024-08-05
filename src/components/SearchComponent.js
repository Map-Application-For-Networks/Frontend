// components/SearchComponent.js

import React from 'react';
import { Input } from 'antd';
import { useMap } from 'react-leaflet';

const DEFAULT_ZOOM = 14;

function SearchComponent({ markers, setSelectedMarker, setClosedByMapClick }) {
  const map = useMap();

  const onSearch = (value) => {
    const marker = markers.find(marker => marker.title.toLowerCase().includes(value.toLowerCase()));
    if (marker) {
      setSelectedMarker(marker);
      setClosedByMapClick(false);
      // Center the map on the found marker
      map.setView(marker.geocode, DEFAULT_ZOOM);
    } else {
      console.log("No matching marker found");
    }
  };

  return (
    <Input.Search
      className="search-container"
      placeholder="Please enter the research facility or lab name."
      onSearch={onSearch}
      enterButton
    />
  );
}

export default SearchComponent;
