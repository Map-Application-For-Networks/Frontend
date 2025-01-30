import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useMap } from 'react-leaflet';
import axios from 'axios';

const DEFAULT_ZOOM = 5;

function SearchComponent({ markers }) {
  const map = useMap();
  const [tagsMap, setTagsMap] = useState({});

  // Fetch tag names for Tech, Model, and Expertise
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const [techTagsRes, modelTagsRes, expertiseTagsRes] = await Promise.all([
          axios.get('https://backend-delta-seven-47.vercel.app/api/techtags'),
          axios.get('https://backend-delta-seven-47.vercel.app/api/modeltags'),
          axios.get('https://backend-delta-seven-47.vercel.app/api/expertisetags'),
        ]);

        const tagsMapping = {
          ...Object.fromEntries(techTagsRes.data.map((tag) => [tag._id, tag.tagName])),
          ...Object.fromEntries(modelTagsRes.data.map((tag) => [tag._id, tag.tagName])),
          ...Object.fromEntries(expertiseTagsRes.data.map((tag) => [tag._id, tag.tagName])),
        };

        setTagsMap(tagsMapping);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  // Format markers for Autocomplete
  const items = markers.map((marker, index) => ({
    id: index,
    title: marker.title,
    tags: [
      ...(marker.techTags || []).map((tagId) => tagsMap[tagId] || tagId),
      ...(marker.modelTags || []).map((tagId) => tagsMap[tagId] || tagId),
      ...(marker.expertiseAreaTags || []).map((tagId) => tagsMap[tagId] || tagId),
    ].filter(Boolean), // Remove undefined values
    marker,
  }));

  const filterOptions = (options, { inputValue }) => {
    return options
      .map((option) => {
        if (!inputValue.trim()) {
          // If input is empty, show only titles (no tags)
          return { ...option, matchingTags: [] };
        }

        // Filter tags based on input
        const matchingTags = option.tags.filter((tag) =>
          tag.toLowerCase().includes(inputValue.toLowerCase())
        );

        // If title matches, show all tags; if only tags match, show matching tags
        if (option.title.toLowerCase().includes(inputValue.toLowerCase())) {
          return { ...option, matchingTags: option.tags };
        } else if (matchingTags.length > 0) {
          return { ...option, matchingTags };
        }

        return null;
      })
      .filter(Boolean); // Remove null values (non-matching markers)
  };

  const handleOnSelect = (event, value) => {
    if (value) {
      const selectedMarker = value.marker;

      // Center the map on the selected marker
      map.setView(selectedMarker.geocode, DEFAULT_ZOOM);

      // Open the popup if available
      map.eachLayer((layer) => {
        if (layer.getLatLng && layer.getLatLng().equals(selectedMarker.geocode)) {
          layer.openPopup();
        }
      });
    } else {
      console.log("No matching marker found");
    }
  };

  return (
    <div className="search-container">
      <Autocomplete
        size="small"
        options={items}
        filterOptions={filterOptions}
        getOptionLabel={(option) =>
          `${option.title} ${
            option.matchingTags && option.matchingTags.length > 0
              ? `(${option.matchingTags.join(', ')})`
              : ''
          }`
        }
        onChange={handleOnSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by title or tags"
            variant="outlined"
            sx={{
              backgroundColor: 'white',
              borderRadius: '5px',
              boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
              '& .MuiInputBase-input': {
                padding: '10px',
              },
            }}
          />
        )}
        sx={{
          width: '100%',
          maxWidth: '400px',
          margin: 'auto',
          backgroundColor: 'white',
          '& .MuiAutocomplete-listbox': {
            backgroundColor: 'white',
          },
        }}
      />
    </div>
  );
}

export default SearchComponent;
