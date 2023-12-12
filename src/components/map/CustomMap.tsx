import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'

import CustomMapChildren from './CustomMapChildren';
import './CustomMap.css'


L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CustomMap = () => {
  //
  const [map, setMap] = React.useState<L.Map | null>(null)

  const center = React.useMemo<L.LatLngLiteral>(() => ({ lat: 51.505, lng: -0.09 }), [map]);

  return (
    <>
      <div style={{height: 400, width: '100%'}}>
        <MapContainer
          style={{ height: '100%' }}
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
      </div>
    </>
  );
}

export default CustomMap;
