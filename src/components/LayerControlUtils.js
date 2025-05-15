import { Marker, LayerGroup, LayersControl, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { createClusterCustomIcon } from './iconHelper';
import { Tag } from 'antd';
import ExRNAIcon from '../icons/ExRNA_PATH_Logo-3.png'; 
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
                  <img src={ExRNAIcon} alt="Marker Icon" />

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
                  <h2>Organisms: </h2>
                  <ul>
                    {marker.organismTags.map((topic, idx) => (
                      <Tag color="blue" key={idx}>{topic}</Tag>
                    ))}
                  </ul>

                  <h2>exRNA-Driven Process:</h2>
                  <ul>
                    {marker.drivenProcessTags.map((topic, idx) => (
                      <Tag color="orange" key={idx}>{topic}</Tag>
                    ))}
                  </ul>

                  <h2>Class of exRNA:</h2>
                  <ul>
                    {marker.classOfExrnaTags.map((topic, idx) => (
                      <Tag color="purple" key={idx}>{topic}</Tag>
                    ))}
                  </ul>

                  <h2>Carrier of exRNA:</h2>
                  <ul>
                    {marker.carrierOfExrnaTags.map((topic, idx) => (
                      <Tag color="green" key={idx}>{topic}</Tag>
                    ))}
                  </ul>

                  <h2>Application Area:</h2>
                  <ul>
                    {marker.applicationAreaTags.map((topic, idx) => (
                      <Tag color="gold" key={idx}>{topic}</Tag>
                    ))}
                  </ul>

                  <h2>Research Expertise:</h2>
                  <ul>
                    {marker.researchExpertiseTags.map((topic, idx) => (
                      <Tag color="cyan" key={idx}>{topic}</Tag>
                    ))}
                  </ul>

                  <h2>Technical Expertise:</h2>
                  <ul>
                    {marker.techExpertiseTags.map((topic, idx) => (
                      <Tag color="volcano" key={idx}>{topic}</Tag>
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
