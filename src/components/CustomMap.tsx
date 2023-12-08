import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import DisplayPosition from './DisplayPosition';
import CustomMapChildren from './CustomMapChildren';


L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CustomMap = () => {
  //
  const [map, setMap] = React.useState<L.Map | null>(null)

  const center = React.useMemo<L.LatLngExpression>(() => ({ lat: 51.505, lng: -0.09 }), [map]);

  return (
    <>
      {map && <DisplayPosition map={map} center={center} zoom={13} />}
      <MapContainer
        style={{ height: '100%'}}
        ref={setMap}
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CustomMapChildren center={center} />
      </MapContainer>
    </>
  );
}

export default CustomMap;
