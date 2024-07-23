import { Marker, LayerGroup , LayersControl} from 'react-leaflet';
import { createClusterCustomIcon } from '../iconHelper';
import MarkerClusterGroup from "react-leaflet-cluster";

export function createOverlayControl(role, markers, setIconForRole, handleMarkerClick, selectedMarker, setSelectedMarker, CustomPopup) {
    return (
        <LayersControl.Overlay name={role} checked={true}>
          <LayerGroup>
            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={(cluster) => createClusterCustomIcon(cluster)}
            >
              {markers
                .filter(marker => marker.role === role)
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
    );
} 
