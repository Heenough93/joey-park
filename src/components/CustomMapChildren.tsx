import React from 'react';
import { useMap, useMapEvent } from 'react-leaflet';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import GroupMarker from './GroupMarker';
import CenterMarker from './CenterMarker';
import LocationMarker from './LocationMarker';
import Markers from './Markers';
import { Visitor } from '../interfaces';


interface Props {
  center: L.LatLngExpression,
}
const CustomMapChildren = ({center}: Props) => {
  //
  const map = useMap();

  const animateRef = React.useRef<boolean>(true)

  const mapClickEvent = React.useCallback((e: L.LeafletMouseEvent) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    })
  }, [animateRef])

  useMapEvent('click', mapClickEvent);

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
