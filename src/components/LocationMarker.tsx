import React from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';


const LocationMarker = () => {
  const [position, setPosition] = React.useState<null | any>(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

    return (
      <>
        {position !== null && <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>}
      </>
    );
}

export default LocationMarker;
