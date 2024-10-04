import { Marker, LayerGroup, LayersControl, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { createClusterCustomIcon } from './iconHelper';
import { Tag } from 'antd';
import tastanlabImage from '../icons/tastanlab.png'; // This is for demo purposes. You need to import all images or take it from the backend.
import './Popup.css'; // You can change the design patterns from this file.

export function createOverlayControl(
  role,
  markers,
  setIconForRole
) {
  const visitStatuses = ['Open', 'Closed'];

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
                  {/* Image */}
                  <img src={tastanlabImage} alt="Marker Icon" />

                  {/* Date */}
                  <h3>
                    {(() => {
                      const date = new Date(marker.date);
                      const day = String(date.getDate()).padStart(2, '0');
                      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
                      const year = date.getFullYear();
                      return `${day}/${month}/${year}`;
                    })()}
                  </h3>
                  <br></br>
                  {/* Title */}
                  <h2>{marker.title}</h2>

                  {/* Details */}
                  <p>{marker.details}</p>
                  <br></br>
                  {/* Research Fields / Topics */}
                  <h2>Research Fields / Topics:</h2>
                  <ul>
                    {marker.researchFieldTopic.map((topic, idx) => (
                      <Tag color="blue" key={idx}>{topic}</Tag>
                    ))}
                  </ul>

                  {/* Visitor Status with Colored Tag */}
                  <br></br>
                  <h3>
                    Visitor Status: 
                    <Tag 
                      color={marker.visitStatus === 'Open' ? 'green' : 'red'} 
                      style={{ marginLeft: '10px' }}
                    >
                      {marker.visitStatus}
                    </Tag>
                  </h3>

                  {/* Divider */}
                  <br></br>
                  <hr />

                  {/* Contact Information */}
                  <br></br>
                  <h2>Contact Information</h2>
                  <p><strong>Email:</strong> <a href={`mailto:${marker.email}`}>{marker.email}</a></p>
                  <p><strong>Phone:</strong> <a href={`tel:${marker.phone}`}>{marker.phone}</a></p>
                </div>
              </Popup>
              </Marker>
            ))}
        </MarkerClusterGroup>
      </LayerGroup>
    </LayersControl.Overlay>
  ));
}


