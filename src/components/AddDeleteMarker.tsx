import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';


interface Props {
  map: L.Map | null,
}

const AddDeleteMarker = ({map}: Props) => {
  const [markers, setMarkers] = React.useState<L.LatLngExpression[]>([])

  React.useEffect(() => {
    if (!map) return;

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      setMarkers((mar) => [...mar, {lat, lng}]);
    })
  }, [map]);

  const removeMarker = (index: number, map: L.Map) => {
    map.eachLayer((layer) => {
      if (layer.options && layer.options.pane === "markerPane") {
        if (layer.options.attribution === index.toString()) {
          map.removeLayer(layer);
        }
      }
    });
  }

  return (
      <>
        {map && markers.length > 0 &&
          markers.map((marker, index) => {
            return <Marker
              key={index}
              attribution={index.toString()}
              position={marker}
              draggable={true}
            >
              <Popup>
                <button onClick={() => removeMarker(index, map)}>delete marker</button>
              </Popup>
            </Marker>
          })}
      </>
    );
}

export default AddDeleteMarker;
