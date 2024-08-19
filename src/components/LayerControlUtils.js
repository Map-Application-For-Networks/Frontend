import { Marker, LayerGroup, LayersControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { createClusterCustomIcon } from '../iconHelper';

export function createOverlayControl(
  role,
  markers,
  setIconForRole,
  handleMarkerClick,
  selectedMarker,
  setSelectedMarker,
  CustomPopup
) {
  const visitStatuses = ['Open', 'Pending', 'Closed']; 

  return visitStatuses.map((status) => (
    <LayersControl.Overlay
      key={`${role}-${status}`}
      name={`${role} (${status})`}
      checked={true}
    >
      <LayerGroup>
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={(cluster) => createClusterCustomIcon(cluster)}
        >
          {markers
            .filter(
              (marker) =>
                marker.role === role && marker.visitStatus === status
            )
            .map((marker, index) => (
              <Marker
                key={index}
                position={marker.geocode}
                icon={setIconForRole(marker.role)}
                eventHandlers={{
                  click: () => handleMarkerClick(marker),
                }}
              >
                {selectedMarker === marker && (
                  <CustomPopup
                    marker={selectedMarker}
                    onClose={() => setSelectedMarker(null)}
                  />
                )}
              </Marker>
            ))}
        </MarkerClusterGroup>
      </LayerGroup>
    </LayersControl.Overlay>
  ));
}

