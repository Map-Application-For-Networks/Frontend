import { Marker, LayerGroup, LayersControl, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { createClusterCustomIcon } from '../iconHelper';
import { Tag } from 'antd';
import tastanlabImage from '../icons/tastanlab.png'; // This is for demo purposes. You need to import all images or take it from the backend.
import './Popup.css'; // You can change the design patterns from this file.

export function createOverlayControl(
  role,
  markers,
  setIconForRole
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
            .filter(marker => marker.role === role && marker.visitStatus === status)
            .map((marker, index) => (
              <Marker
                key={index}
                position={marker.geocode}
                icon={setIconForRole(marker.role)}
              >
                <Popup>
                  <div className="modal-content">
                    <img src={tastanlabImage} alt="Marker Icon" />
                    <h3>{marker.date}</h3>
                    <h2>{marker.title}</h2>
                    <p>{marker.details}</p>
                    <h2>Research Field / Topic:</h2>
                    <ul>
                      {marker.researchFieldTopic.map((topic, idx) => (
                        <Tag color="blue" key={idx}>{topic}</Tag>
                      ))}
                    </ul>
                    <strong>Visitor Status: {marker.visitStatus}</strong>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MarkerClusterGroup>
      </LayerGroup>
    </LayersControl.Overlay>
  ));
}


