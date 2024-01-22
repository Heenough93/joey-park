import React from 'react';
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';


interface Props {
  center:  L.LatLngLiteral,
}

const CenterMarker = ({ center }: Props) => {
  //
  const map = useMap();

  React.useEffect(() => {
    if (!map) return;

    const customControler = L.Control.extend({
      options: {
        position: 'topright',
      },

      onAdd: function () {
        const btn = L.DomUtil.create('button', 'back-to-home');
        btn.title = 'center';
        btn.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M32 18.451L16 6.031 0 18.451v-5.064L16 .967l16 12.42zM28 18v12h-8v-8h-8v8H4V18l12-9z"></path></svg>';

        btn.onclick = function () {
          map.flyTo(center, map.getZoom());
          document.body.classList.remove('show-button-home');
        };

        return btn;
      },
    });

    map.addControl(new customControler());
  }, [ map ]);

  useMapEvents({
    dragend() {
      const { lat, lng } = center;
      const { lat: latFromMap, lng: lngFromMap } = map.getCenter();

      const checkEqualArrays = lat !== latFromMap && lng !== lngFromMap;

      document.body.classList[checkEqualArrays ? 'add' : 'remove']('show-button-home');
    },
  });

  return (
    <>
      <Marker position={center}>
        <Popup>Here is the center.</Popup>
      </Marker>
    </>
  );
};

export default CenterMarker;
