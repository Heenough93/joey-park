import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import { v4 as uuidv4 } from 'uuid';

import CustomMapChildren from './CustomMapChildren';
import './CustomMap.css'
import { getCurrentPosition, registerVisitor } from '../../functions';
import { Visitor } from '../../interfaces';


L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface Props {
  isVisitor: boolean,
}

const CustomMap = (props: Props) => {
  //
  const { isVisitor } = props;

  const [map, setMap] = React.useState<L.Map | null>(null)
  const [visitor, setVisitor] = React.useState<Visitor | null>(null);
  const [visitors, setVisitors] = React.useState<Visitor[]>([])

  const center = React.useMemo<L.LatLngLiteral>(() => ({ lat: 51.505, lng: -0.09 }), [map]);

  React.useEffect(() => {
    if (visitor) return;

    fetch(process.env.REACT_APP_BASE_URL + 'find-visitors', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: null,
    })
      .then((res) => res.json())
      .then((res) => {
        isVisitor
          ? setVisitors(res.data.filter((item: Visitor) => item.IPv4))
          : setVisitors(res.data.filter((item: Visitor) => !item.IPv4))
      })
  }, [isVisitor, visitor])

  React.useEffect(() => {
    if (!visitor) return;

    (registerVisitor)(Object.assign(visitor, { id: uuidv4(), date: new Date().toISOString() }))
      .then(() => setVisitor(null));
  }, [visitor])

  const handleClickSave = React.useCallback(() => {
    const positionCallback = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const target: Visitor = {
        appName: '',
        platform: '',
        userAgent: '',
        country_code: '',
        country_name: '',
        city: '',
        postal: '',
        latitude: latitude,
        longitude: longitude,
        IPv4: '',
        state: '',
        id: '',
        date: '',
      }
      setVisitor(target);
    }

    getCurrentPosition(positionCallback);
  }, [])

  return (
    <div style={{ height: 600, width: '100%' }}>
      {!isVisitor && <button onClick={handleClickSave}>SAVE</button>}

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
        <CustomMapChildren center={center} visitors={visitors} />
      </MapContainer>
    </div>
  );
}

export default CustomMap;
