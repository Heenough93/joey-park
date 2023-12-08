import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';


interface Props {
  center:  L.LatLngExpression,
}

const CenterMarker = ({ center }: Props) => {
  //
  return (
    <>
      <Marker position={center}>
        <Popup>Here is the center.</Popup>
      </Marker>
    </>
  );
}

export default CenterMarker;
