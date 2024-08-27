// HelperFunction.js

// This part is developed to prevent the error occurs when different markers have the same location. It will add a small offset.
export function applyOffset(marker, index, totalMarkers) {
    const offset = 0.00025 * (index - (totalMarkers - 1) / 2); 
    return {
      ...marker,
      geocode: [
        marker.geocode[0] + offset, // Offset latitude
        marker.geocode[1] + offset, // Offset longitude
      ],
    };
  }
  
  // Function to group markers by geocode and apply offsets where needed
  export function processMarkers(markers) {
    const markerGroups = markers.reduce((acc, marker) => {
      const key = `${marker.geocode[0]},${marker.geocode[1]}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(marker);
      return acc;
    }, {});
  
    const processedMarkers = [];
  
    Object.values(markerGroups).forEach((group) => {
      if (group.length === 1) {
        processedMarkers.push(group[0]);
      } else {
        group.forEach((marker, index) => {
          const offsetMarker = applyOffset(marker, index, group.length);
          processedMarkers.push(offsetMarker);
        });
      }
    });
  
    return processedMarkers;
  }
  