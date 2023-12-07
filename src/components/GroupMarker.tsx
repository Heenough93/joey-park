import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Visitor } from '../interfaces';


interface Props {
  visitors: Visitor[],
}

const GroupMarker = ({visitors}: Props) => {
  const points = visitors.map((visitor) => ({lat: visitor.latitude, lng: visitor.longitude, title: visitor.date}));

  return (
    <MarkerClusterGroup>
      {points.map(({ lat, lng, title }, index) => (
        <Marker key={index} position={{lat, lng}}>
          <Popup>{title}</Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  )
}

export default GroupMarker;
