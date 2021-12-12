import { useState, useRef, useEffect, useContext } from "react";

// Mapbox Library
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";

// State Management
import { UserContext } from "../../contexts/userContext";

// Global variable
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FydW5pYW55YSIsImEiOiJja3czNGxvZjUwaGp4Mm5tcDN6emtpZWZoIn0.ozGrXjMS27tMGkG2scSosw";

export default function MapRender({ isMarker }) {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { lat, lng } = userState.orderLocation;

  const mapContainer = useRef(null);

  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/karunianya/ckwp0yike2lnc14s95ku31tgq",
      center: [lng, lat],
      zoom: zoom,
    });

    const marker = new mapboxgl.Marker({
      draggable: isMarker && true,
    })
      .setLngLat([lng, lat])
      .addTo(map);

    if (isMarker) {
      const onDragEnd = () => {
        let lngLat = marker.getLngLat();

        userDispatch({
          type: "ORDER_LOC",
          payload: { lng: lngLat.lng, lat: lngLat.lat },
        });
      };

      marker.on("dragend", onDragEnd);
    }

    // return () => map.remove();
  }, []);

  useEffect(() => {
    console.log("lng : ", lng, "lat : ", lat);
  }, [lng, lat]);
  return <div className="map-container" ref={mapContainer}></div>;
}
