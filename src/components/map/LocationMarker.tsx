import React from 'react';
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet'


const LocationMarker = () => {
  //
  const [position, setPosition] = React.useState<L.LatLng | null>(null)

  const map = useMap()

  useMapEvents({
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
    dragend() {
      if (position) {
        const { lat, lng } = position;
        const { lat: latFromMap, lng: lngFromMap } = map.getCenter();

        const checkEqualArrays = lat !== latFromMap && lng !== lngFromMap;

        const locateActive = document.querySelector(`.locateButton`);
        locateActive?.classList[checkEqualArrays ? "remove" : "add"]("locateActive");
      }
    },
  })

  React.useEffect(() => {
    // create custom button
    const customControl = L.Control.extend({
      // button position
      options: {
        position: "topleft",
      },

      // method
      onAdd: function () {
        const button = L.DomUtil.create("button", 'locateButton leaflet-bar');
        L.DomEvent.disableClickPropagation(button);

        button.title = "locate";
        button.innerHTML =
          '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>';

        L.DomEvent.on(button, "click", this._clicked, this);

        return button;
      },
      _clicked: function (e: Event) {
        L.DomEvent.stopPropagation(e);

        // this.removeLocate();

        this._checkLocate();

        return;
      },
      _checkLocate: function () {
        return this._locateMap();
      },
      _locateMap: function () {
        const locateActive = document.querySelector(`.locateButton`);
        const locate = locateActive?.classList.contains('locateActive');
        // add/remove class from locate button
        locateActive?.classList[locate ? "remove" : "add"]('locateActive');

        // remove class from button
        // and stop watching location
        if (locate) {
          this.removeLocate();
          map.stopLocate();
          return;
        }

        // location on found
        map.on("locationfound", this.onLocationFound, this);
        // locataion on error
        map.on("locationerror", this.onLocationError, this);

        // start locate
        map.locate({ setView: true, enableHighAccuracy: true });
      },
      onLocationFound: function (e: L.LocationEvent) {
        // add circle
        this.addCircle(e).addTo(this.featureGroup()).addTo(map);

        // add marker
        this.addMarker(e).addTo(this.featureGroup()).addTo(map);

        // add legend
      },
      // on location error
      onLocationError: function () {
        this.addLegend("Location access denied.");
      },
      // feature group
      featureGroup: function () {
        return new L.FeatureGroup();
      },
      // add legend
      addLegend: function (text: string) {
        const checkIfDescriotnExist = document.querySelector(".description");

        if (checkIfDescriotnExist) {
          checkIfDescriotnExist.textContent = text;
          return;
        }

        const legend = L.Control.extend({
          options: {
            position: "bottomleft",
          },

          onAdd: function () {
            let div = L.DomUtil.create("div", "description");
            L.DomEvent.disableClickPropagation(div);
            div.insertAdjacentHTML("beforeend", text);
            return div;
          },
          addTo: (map),
        })

        map.addControl(new legend());
      },

      addCircle: function (e: L.LocationEvent) {
        return L.circle([e.latlng.lat, e.latlng.lng], e.accuracy / 2, {
          className: "circle-test",
          weight: 2,
          stroke: false,
          fillColor: "#136aec",
          fillOpacity: 0.15,
        });
      },
      addMarker: function (e: L.LocationEvent) {
        return L.marker([e.latlng.lat, e.latlng.lng], {
          icon: L.divIcon({
            className: 'locatedAnimation',
            iconSize: L.point(17, 17),
            popupAnchor: [0, -15],
          }),
        }).bindPopup("Your are here :)");
      },
      removeLocate: function () {
        map.eachLayer(function (layer) {
          if (layer instanceof L.Marker) {
            const { icon } = layer.options;
            if (icon?.options.className === '.locatedAnimation') {
              map.removeLayer(layer);
            }
          }
          if (layer instanceof L.Circle) {
            if (layer.options.className === "circle-test") {
              map.removeLayer(layer);
            }
          }
        });
      },
    });

    // adding new button to map controll
    map.addControl(new customControl());
  }, [map]);

  return (
    <>
      {position !== null && <Marker position={position}>
        <Popup>You are here!</Popup>
      </Marker>}
    </>
  );
}

export default LocationMarker;
