import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L, { Marker as LeafletMarker } from 'leaflet';


interface Props {
  center:  L.LatLngExpression,
}

const DraggableMarker = ({ center }: Props) => {
  const [draggable, setDraggable] = React.useState(false)
  const [position, setPosition] = React.useState(center)

  const markerRef = React.useRef<LeafletMarker>(null)

  const eventHandlers = React.useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )
  const toggleDraggable = React.useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  )
}

export default DraggableMarker;
