import React from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L, { Marker as LeafletMarker } from 'leaflet';


interface Props {
  position:  L.LatLngExpression & { id: number },
  setPositions: React.Dispatch<React.SetStateAction<(L.LatLngExpression & { id: number })[]>>,
}

const DraggableMarker = ({ position, setPositions }: Props) => {
  //
  const [draggable, setDraggable] = React.useState(false)

  const markerRef = React.useRef<LeafletMarker>(null)

  const map = useMap();

  const eventHandlers = React.useMemo(() => {
    return {
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPositions((prev) => {
            return prev.map((target) => {
              if (target.id === position.id) {
                return { ...marker.getLatLng(), id: target.id };
              } else {
                return target;
              }
            })
          });
        }
      },
    }
  }, [position])

  const toggleDraggable = React.useCallback(() => {
    setDraggable((prev) => !prev)
  }, [])

  const removeMarker = React.useCallback((id: number) => {
    map.eachLayer((layer) => {
      if (layer.options && layer.options.pane === "markerPane") {
        if (layer.options.attribution === id.toString()) {
          map.removeLayer(layer);
          setPositions((prev) => {
            return prev.filter((target) => target.id !== id)
          });
        }
      }
    });
  }, [map])

  return (
    <Marker
      key={position.id}
      ref={markerRef}
      attribution={position.id.toString()}
      position={position}
      eventHandlers={eventHandlers}
      draggable={draggable}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
        <button onClick={() => removeMarker(position.id)}>delete marker</button>
      </Popup>
    </Marker>
  )
}

export default DraggableMarker;
