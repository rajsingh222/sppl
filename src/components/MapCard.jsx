import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import marker images using ES module syntax
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default icon issues
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// This component forces the map to recalc its size.
function ResizeHandler() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }, [map]);
  return null;
}

const MapCard = ({
  coordinates = [51.505, -0.09],
  zoom = 13,
  popupText = "Your Location",
  height = "400px",
  width = "100%"
}) => {
  return (
    <MapContainer center={coordinates} zoom={zoom} style={{ height, width }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://openstreetmap.org'>OpenStreetMap</a> contributors"
      />
      <Marker position={coordinates}>
        <Popup>{popupText}</Popup>
      </Marker>
      <ResizeHandler />
    </MapContainer>
  );
};

export default MapCard;