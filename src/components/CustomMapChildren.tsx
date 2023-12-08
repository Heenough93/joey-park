import React from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'

import GroupMarker from './GroupMarker';
import CenterMarker from './CenterMarker';
import LocationMarker from './LocationMarker';
import Markers from './Markers';
import { Visitor } from '../interfaces';


interface Props {
  center: L.LatLngLiteral,
}
const CustomMapChildren = ({center}: Props) => {
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
    }

    const info = L.DomUtil.create('div', 'legend');

    const position = L.Control.extend({
      options: {
        position: 'bottomleft'
      },

      onAdd: function () {
        const bounds = map.getBounds();
        info.innerHTML = contentText(bounds);
        return info;
      }
    })

    map.addControl(new position());

    map.on('moveend zoomend', () => {
      const bounds = map.getBounds();
      info.textContent = contentText(bounds);
    });
  }, [map])

  const [visitors, setVisitors] = React.useState<Visitor[]>([])

  React.useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + 'find-visitors', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: null,
    })
      .then((res) => res.json())
      .then((res) => setVisitors(res.data))
  }, [])

  return (
    <>
      <GroupMarker visitors={visitors} />
      <CenterMarker center={center} />
      <LocationMarker />
      <Markers />
    </>
  );
}

export default CustomMapChildren;
