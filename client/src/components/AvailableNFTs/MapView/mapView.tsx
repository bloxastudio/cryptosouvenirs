import { Button } from "@mantine/core";
import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";

const MapView = (props: MapViewProps) => {
  const { nfts, userPosition, onClick } = props;
  const userCoords = [userPosition.coords.latitude, userPosition.coords.longitude];
  const mapRef = useRef();

  return (
    <MapContainer center={userCoords} zoom={13} scrollWheelZoom={false} style={{ height: "100vh", width: "100wh" }} ref={mapRef}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker key={0} position={userCoords}></Marker>
      {nfts.map((availableNFT) => {
        const { latitude, longitude, rowKey } = availableNFT;

        return (
          <CircleMarker key={rowKey} center={[latitude, longitude]}>
            <Popup>
              <Button
                size="xs"
                color="green"
                onClick={() => {
                  onClick(availableNFT);
                  mapRef.current.closePopup();
                }}
              >
                {"Mint"}
              </Button>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
};

export interface MapViewProps {
  nfts: Array<AvailableNFT>;
  userPosition: GeolocationPosition;
}

export default MapView;
