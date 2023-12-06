import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import DisplayPosition from './DisplayPosition';
import SetViewOnClick from './SetViewOnClick';
import LocationMarker from './LocationMarker';
import DraggableMarker from './DraggableMarker';


L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const center: L.LatLngExpression = { lat: 51.505, lng: -0.09 };
const zoom: number = 13;

const MapTest = () => {
  //
  const [map, setMap] = React.useState<L.Map | null>(null)

  const animateRef = React.useRef<boolean>(true)

    return (
      <>
        {map && <DisplayPosition map={map} center={center} zoom={zoom} />}
        <MapContainer
          style={{ height: '100%'}}
          ref={setMap}
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/*<Marker position={position}>*/}
          {/*  <Popup>*/}
          {/*    A pretty CSS3 popup. <br /> Easily customizable.*/}
          {/*  </Popup>*/}
          {/*</Marker>*/}
          <SetViewOnClick animateRef={animateRef} />
          <LocationMarker />
          <DraggableMarker center={center} />
        </MapContainer>
      </>
    );
}

export default MapTest;
