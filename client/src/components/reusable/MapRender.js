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
  "pk.eyJ1IjoiaWxoYW0yNSIsImEiOiJja20yczc0dm0zOWczMndwMzVmdmJ1bjI4In0.1l2Zgxjy5R0iW2SlySO_fQ";

export default function MapRender({ isMarker }) {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { lat, lng } = userState.orderLocation;

  const mapContainer = useRef(null);

  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
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
