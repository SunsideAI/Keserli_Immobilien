"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface PropertyMapProps {
  lat: number;
  lng: number;
  title: string;
  city: string;
  hideExactLocation?: boolean;
  className?: string;
}

export default function PropertyMap({ lat, lng, title, city, hideExactLocation, className }: PropertyMapProps) {
  const position: [number, number] = [lat, lng];

  return (
    <MapContainer
      center={position}
      zoom={hideExactLocation ? 13 : 15}
      scrollWheelZoom={false}
      className={className || "h-[300px] w-full rounded-card"}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hideExactLocation ? (
        <Circle
          center={position}
          radius={500}
          pathOptions={{ color: "#2D7A7A", fillColor: "#2D7A7A", fillOpacity: 0.15 }}
        />
      ) : (
        <Marker position={position} icon={icon}>
          <Popup>
            <strong>{title}</strong>
            <br />
            {city}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
