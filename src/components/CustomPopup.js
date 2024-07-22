import React, { useState, useEffect } from 'react';
import { Popup } from 'react-leaflet';
import Modal from 'react-modal';
import { Tag, Button } from 'antd'; // You can use antd libraries for design. There are many well-designed components.
import CloseIcon from '@mui/icons-material/Close';
import tastanlabImage from '../icons/tastanlab.png'; // This is for demo purposes. You need to import all images or take it from the backend.
import './CustomPopup.css'; // You can change the design patterns from this file.


//The main purpose of this component is to create a pop up when the screen size is very small or phone.
//Normal popup component that was provided by react-leaflet is not suitable for this purpose.
//If you make browser to small the pop up screen will be shown as a fullscreen. For larger screens, it displays as a typical Leaflet popup.

const CustomPopup = ({ marker, onClose }) => {
  // State to determine if the popup should be a modal
  const [isModal, setIsModal] = useState(false);
  // State to manage the visibility of the modal
  const [modalIsOpen, setModalIsOpen] = useState(true); // Open the modal by default when the marker is clicked

  // Effect to update modal state based on screen width
  useEffect(() => {
    const updateModalState = () => {
      const width = window.innerWidth;
      if (width < 768) { //For which size the full screen will be trigerred can be updated here.
        // If screen width is less than 768px, show the popup as a modal
        setIsModal(true);
      } else {
        setIsModal(false);
      }
    };

    updateModalState();
    // Add event listener to update modal state on window resizeit will listen for the change in the screen
    window.addEventListener('resize', updateModalState);

    return () => {
      window.removeEventListener('resize', updateModalState);
    };
  }, []);

   // Function to close the modal and trigger the onClose callback
  const closeModal = () => {
    setModalIsOpen(false);
    onClose(); // Notify parent to close the modal
  };


//<---POP UP DESIGN--->
  const popupContent = (
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
  );
//<---!POP UP DESIGN--->

// Effect to update the modal state if it is closed
  useEffect(() => {
    if (!modalIsOpen) {
      setIsModal(false);
    }
  }, [modalIsOpen]);

  // Conditional rendering of modal or popup based on isModal state. If isModal it will return the pop up that is full screen.
  return isModal ? (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Marker Details"
      style={{
        overlay: {
          zIndex: 1000
        },
        content: {
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          margin: '0',
          padding: '20px',
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'stretch'
        },
      }}
    >
      <Button
        icon={<CloseIcon />} 
        onClick={closeModal} 
        style={{ alignSelf: 'flex-end', marginBottom: '10px' }}
      >
        Close
      </Button>
      {popupContent}
    </Modal>
  ) : (
    <Popup>
      {popupContent}
    </Popup>
  );
};

export default CustomPopup;



