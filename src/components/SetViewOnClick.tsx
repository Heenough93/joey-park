import React from 'react';
import { useMapEvent } from 'react-leaflet';


interface Props {
  animateRef: React.MutableRefObject<boolean>,
}

const SetViewOnClick = ({animateRef}: Props) => {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    })
  })

  return null
}

export default SetViewOnClick;
