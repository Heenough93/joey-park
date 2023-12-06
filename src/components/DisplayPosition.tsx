import React from 'react';
import L from 'leaflet';


interface Props {
  map: L.Map,
  center:  L.LatLngExpression,
  zoom: number
}

const DisplayPosition = ({ map, center, zoom } : Props) => {
  //
  const [position, setPosition] = React.useState(() => map.getCenter())

  const onMove = React.useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  React.useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  const handleClickReset = React.useCallback(() => {
    map.setView(center, zoom)
  }, [map])

  const handleClickHere = React.useCallback(() => {
    map.locate();
  }, [map])

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
      <button onClick={handleClickReset}>reset</button>
      <button onClick={handleClickHere}>Here</button>
    </p>
  )
}

export default DisplayPosition;
