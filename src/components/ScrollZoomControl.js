import { useMap } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';

const ScrollZoomControl = () => {
  const map = useMap();
  const [showWarning, setShowWarning] = useState(false);
  const warningTimeout = useRef(null);

  useEffect(() => {
    const container = map.getContainer();

    const isModifierKeyHeld = (e) => {
      return e.ctrlKey || e.metaKey || e.altKey;
    };

    const handleWheel = (e) => {
      if (isModifierKeyHeld(e)) {
        map.scrollWheelZoom.enable();
        clearTimeout(warningTimeout.current);
        setShowWarning(false);
      } else {
        map.scrollWheelZoom.disable();
        setShowWarning(true);
        clearTimeout(warningTimeout.current);
        warningTimeout.current = setTimeout(() => {
          setShowWarning(false);
        }, 1000);
      }
    };

    const handleKeyUp = () => {
      map.scrollWheelZoom.disable();
      setShowWarning(false);
      clearTimeout(warningTimeout.current);
    };

    container.addEventListener('wheel', handleWheel);
    window.addEventListener('keyup', handleKeyUp);

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
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        pointerEvents: 'none'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          color: '#d32f2f',
          padding: '16px 32px',
          borderRadius: '10px',
          fontSize: '1.4rem',
          fontWeight: '600',
          textAlign: 'center',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}>
          Hold <kbd>⌘</kbd> / <kbd>⌥</kbd> / <kbd>Ctrl</kbd> to zoom
        </div>
      </div>
    )
  );
};

export default ScrollZoomControl;
