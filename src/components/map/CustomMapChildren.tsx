import React from 'react';
import { Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import GroupMarker from './GroupMarker';
import CenterMarker from './CenterMarker';
import LocationMarker from './LocationMarker';
import Markers from './Markers';
import { Visitor } from '../../interfaces';


interface Props {
  center: L.LatLngLiteral,
  visitors: Visitor[],
  isLineVisible: boolean,
}
const CustomMapChildren = ({ center, visitors, isLineVisible }: Props) => {
  //
  // const map = useMap();
  //
  // const animateRef = React.useRef<boolean>(true)
  //
  // const mapClickEvent = React.useCallback((e: L.LeafletMouseEvent) => {
  //   map.setView(e.latlng, map.getZoom(), {
  //     animate: animateRef.current || false,
  //   })
  // }, [animateRef])
  //
  // useMapEvent('click', mapClickEvent);


  const map = useMap();

  React.useEffect(() => {
    if (!map) return;

    const contentText = (bounds: L.LatLngBounds) => {
      return `latitude: ${bounds.getCenter().lat}, longitude: ${bounds.getCenter().lng}`;
    };

    const info = L.DomUtil.create('div', 'legend');

    const position = L.Control.extend({
      options: {
        position: 'bottomleft',
      },

      onAdd: function () {
        const bounds = map.getBounds();
        info.innerHTML = contentText(bounds);
        return info;
      },
    });

    map.addControl(new position());

    map.on('moveend zoomend', () => {
      const bounds = map.getBounds();
      info.textContent = contentText(bounds);
    });
  }, [ map ]);

  const positions: L.LatLngExpression[][] = React.useMemo(() => {
    if (!visitors.length) {
      return [] as L.LatLngExpression[][];
    }

    return visitors.reduce((previousValue, currentValue, currentIndex, array) => {
      if ((array[currentIndex - 1]?.date.slice(0, 10) || '') === currentValue.date.slice(0, 10)) {
        previousValue[previousValue.length - 1].push({ lat: currentValue.latitude, lng: currentValue.longitude });
        return previousValue;
      } else {
        previousValue.push([ { lat: currentValue.latitude, lng: currentValue.longitude } ]);
        return previousValue;
      }
    }, [] as L.LatLngExpression[][]);
  }, [ visitors ]);

  const colors = React.useMemo(() => {
    return [
      'blue',
      'gray',
      'green',
      'red',
      'black',
      'beige',
      'orange',
      'pink',
      'purple',
      'cadetblue',
      'darkblue',
      'darkgreen',
      'darkred',
      'lightblue',
      'lightgray',
      'lightgreen',
    ];
  }, []);

  return (
    <>
      <GroupMarker visitors={visitors} />
      <CenterMarker center={center} />
      <LocationMarker />
      <Markers />
      {isLineVisible && positions.length && positions.map((position, index) => {
        return (<Polyline key={index} pathOptions={{ color:  colors.at(Math.floor(Math.random() * colors.length)) }} positions={position} />);
      })}
    </>
  );
};

export default CustomMapChildren;
