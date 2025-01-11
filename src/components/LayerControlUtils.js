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
  return (
    <LayersControl.Overlay
      key={role}
      name={role}
      checked={true}
    >
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
                  <hr></hr>
                  <br></br>
                  {/* Research Fields / Topics */}
                  <h2>Area(s) of Expertise: </h2>
                  <ul>
                    {marker.expertiseAreaTags.map((topic, idx) => (
                      <Tag color="blue" key={idx}>{topic}</Tag>
                    ))}
                  </ul>
                  <h2>Technologies:</h2>
                  <ul>
                    {marker.techTags.map((topic, idx) => (
                      <Tag color="orange" key={idx}>{topic}</Tag>
                    ))}
                  </ul>
                  <h2>Model Organism:</h2>
                  <ul>
                    {marker.modelTags.map((topic, idx) => (
                      <Tag color="purple" key={idx}>{topic}</Tag>
                    ))}
                  </ul>
                  {/* Divider */}
                  <br></br>
                  <hr />

                  {/* Contact Information */}
                  <br></br>
                  <h2>Contact Information</h2>
                  <p><strong>Email:</strong> <a href={`mailto:${marker.email}`}>{marker.email}</a></p>
                  {marker.phone && (
                    <p><strong>Phone:</strong> <a href={`tel:${marker.phone}`}>{marker.phone}</a></p>
                  )}
                </div>
              </Popup>
              </Marker>
            ))}
        </MarkerClusterGroup>
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
