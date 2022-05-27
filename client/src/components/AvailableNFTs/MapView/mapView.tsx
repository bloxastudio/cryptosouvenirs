import React from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";

const MapView = (props: MapViewProps) => {
  const { nfts, userPosition } = props;
  const userCoords = [userPosition.coords.latitude, userPosition.coords.longitude];

  return (
    <MapContainer center={userCoords} zoom={13} scrollWheelZoom={false} style={{ height: "100vh", width: "100wh" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker key={0} position={userCoords}></Marker>
      {nfts.map(({ latitude, longitude, rowKey }) => (
        <CircleMarker key={rowKey} center={[latitude, longitude]}>
          <Popup>{"Mint " + rowKey}</Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export interface MapViewProps {
  nfts: Array<AvailableNFT>;
  userPosition: GeolocationPosition;
}

export default MapView;
