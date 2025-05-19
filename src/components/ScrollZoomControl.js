import { useMap } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';

const ScrollZoomControl = () => {
  const map = useMap();
  const [showWarning, setShowWarning] = useState(false);
  const warningTimeout = useRef(null);

  useEffect(() => {
    const container = map.getContainer();

    const handleWheel = (e) => {
      if (e.metaKey || e.altKey) {
        map.scrollWheelZoom.enable();
        clearTimeout(warningTimeout.current);
        setShowWarning(false);
      } else {
        map.scrollWheelZoom.disable();

        // Show warning and clear it faster (e.g., after 1s max)
        setShowWarning(true);
        clearTimeout(warningTimeout.current);
        warningTimeout.current = setTimeout(() => {
          setShowWarning(false);
        }, 1000); // faster auto-dismiss
      }
    };

    const handleKeyUp = () => {
      map.scrollWheelZoom.disable();
      setShowWarning(false);
      clearTimeout(warningTimeout.current);
    };

    container.addEventListener('wheel', handleWheel);
    window.addEventListener('keyup', handleKeyUp); // catch Cmd/Alt release

    return () => {
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keyup', handleKeyUp);
      clearTimeout(warningTimeout.current);
    };
  }, [map]);

  return (
    showWarning && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // lighter transparent background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        pointerEvents: 'none'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.65)', // semi-transparent white
          color: '#d32f2f',
          padding: '20px 40px',
          borderRadius: '10px',
          fontSize: '1.4rem',
          fontWeight: '600',
          textAlign: 'center',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        }}>
          Hold ⌘ or ⌥ to zoom the map
        </div>
      </div>
    )
  );
};

export default ScrollZoomControl;
