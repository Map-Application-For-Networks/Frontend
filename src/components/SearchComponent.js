import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useMap } from 'react-leaflet';

const DEFAULT_ZOOM = 14;

function SearchComponent({ markers, setSelectedMarker, setClosedByMapClick }) {
  const map = useMap();

  // Map markers to the format expected by Autocomplete
  const items = markers.map((marker, index) => ({
    id: index,
    title: marker.title,
    marker: marker,
  }));

  const handleOnSelect = (event, value) => {
    if (value) {
      const selectedMarker = markers[value.id];
      setSelectedMarker(selectedMarker);
      setClosedByMapClick(false);
      // Center the map on the selected marker
      map.setView(selectedMarker.geocode, DEFAULT_ZOOM);
    } else {
      console.log("No matching marker found");
    }
  };

  return (
    <div className="search-container">
      <Autocomplete size="small"
        options={items}
        getOptionLabel={(option) => option.title}
        onChange={handleOnSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Please enter the research facility or lab name."
            variant="outlined"
            autoFocus
            sx={{
              
              backgroundColor: 'white', // Ensure background is white
              '& .MuiInputBase-input': {
                padding: '10px',    // Adjust the padding inside the input
              },
            }}
          />
        )}
        sx={{
          height: '1px'
        }}
      />
    </div>
  );
}

export default SearchComponent;
