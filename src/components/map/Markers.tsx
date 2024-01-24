import React from 'react';
import { Polyline, useMapEvent } from 'react-leaflet';
import L from 'leaflet';

import DraggableMarker from './DraggableMarker';


const Markers = () => {
  //
  const [ positions, setPositions ] = React.useState<(L.LatLngExpression & { id: number })[]>([]);

  const mapClickEvent = React.useCallback((e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    setPositions((position) => [ ...position, { lat, lng, id: Math.random() * 1000000000000 } ]);
  }, []);

  useMapEvent('dblclick', mapClickEvent);

  return (
    <>
      {positions.length > 0 && positions.map((position, index) => (
        <>
          <DraggableMarker
            key={index}
            position={position}
            setPositions={setPositions}
          />
          <Polyline pathOptions={{ color: 'black' }} positions={positions} />
        </>
      ))}
    </>
  );
};

export default Markers;
